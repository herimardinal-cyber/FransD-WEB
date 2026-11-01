# Frans Delian Photography Portfolio — Production Deployment Guide
**Target Environment:** Sumopod VPS (Ubuntu 22.04 / 24.04 LTS)  
**Stack:** Next.js 16, React 19, TypeScript, MySQL 8.0 / MariaDB, Prisma ORM, Nginx, PM2

---

## 1. System Requirements & Architecture Overview

- **OS:** Ubuntu 22.04 LTS or 24.04 LTS (64-bit)
- **CPU / RAM:** Minimum 1 vCPU / 2GB RAM (Recommended: 2 vCPU / 4GB RAM)
- **Node.js:** v20.x LTS or v22.x LTS
- **Database:** MySQL 8.0+ or MariaDB 10.11+
- **Process Manager:** PM2 with Cluster Mode
- **Reverse Proxy:** Nginx with HTTP/2 and gzip/brotli compression
- **SSL / TLS:** Let's Encrypt via Certbot
- **Storage:** Local VPS persistent image storage at `/var/lib/frans-delian/uploads`

---

## 2. Server Initial Setup & Firewall

### Update packages and install core utilities
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl wget git unzip build-essential ufw software-properties-common
```

### Configure UFW Firewall
```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
sudo ufw status
```

---

## 3. Install Node.js (v20 LTS)

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node -v   # Should output v20.x
npm -v    # Should output 10.x
```

### Install Global Tools (PM2)
```bash
sudo npm install -g pm2
```

---

## 4. Install & Configure MySQL 8.0

```bash
sudo apt install -y mysql-server
sudo systemctl enable mysql
sudo systemctl start mysql
```

### Secure MySQL Installation
```bash
sudo mysql_secure_installation
```

### Create Database & Dedicated Application User
Open MySQL shell:
```bash
sudo mysql
```

Run the following SQL commands (replace `YourStrongSecretPasswordHere!` with a strong random password):
```sql
CREATE DATABASE frans_delian CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE USER 'frans_app'@'localhost' IDENTIFIED BY 'YourStrongSecretPasswordHere!';
GRANT ALL PRIVILEGES ON frans_delian.* TO 'frans_app'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

---

## 5. Persistent Storage & Permissions

Create the secure directory for photographer uploads:
```bash
sudo mkdir -p /var/lib/frans-delian/uploads
sudo mkdir -p /var/backups/frans-delian

# Set ownership to the non-root user (e.g. 'ubuntu' or 'deploy')
sudo chown -R ubuntu:ubuntu /var/lib/frans-delian
sudo chown -R ubuntu:ubuntu /var/backups/frans-delian
chmod 755 /var/lib/frans-delian/uploads
chmod 700 /var/backups/frans-delian
```

---

## 6. Deploy Application Code

### Clone Repository
```bash
cd /var/www
sudo mkdir -p frans-delian
sudo chown -R ubuntu:ubuntu frans-delian
git clone https://github.com/herimardinal-cyber/FransD-WEB.git frans-delian
cd frans-delian
```

### Configure Production Environment Variables
Create `.env`:
```bash
cp .env.example .env
nano .env
```

Ensure the following production configuration:
```env
# Database (MySQL)
DATABASE_URL="mysql://frans_app:YourStrongSecretPasswordHere!@localhost:3306/frans_delian"

# Next.js Application
NODE_ENV="production"
PORT=3000
NEXT_PUBLIC_SITE_URL="https://fransdelian.com"

# Local Storage Directory on VPS
UPLOAD_DIR="/var/lib/frans-delian/uploads"

# Security & Sessions
SESSION_SECRET="generate-a-strong-64-character-random-hex-string"

# Optional SMTP Notifications
SMTP_HOST="smtp.mailgun.org"
SMTP_PORT=587
SMTP_USER="postmaster@mg.fransdelian.com"
SMTP_PASSWORD="your-smtp-password"
CONTACT_EMAIL_TO="studio@fransdelian.com"
```

### Install Dependencies & Run Database Migrations
```bash
npm ci
npx prisma migrate deploy
```

### Seed Initial Content or Create First Admin
To seed initial curated portfolio works:
```bash
npm run seed
```

To create or reset your admin user:
```bash
npx tsx scripts/create-admin.ts admin@fransdelian.com "YourSecureAdminPassword!" "Frans Delian"
```

### Build Production Next.js Bundle
```bash
npm run build
```

---

## 7. Process Management with PM2

The project includes `ecosystem.config.cjs`. Start the application cluster:

```bash
pm2 start ecosystem.config.cjs --env production
pm2 save
```

### Configure PM2 to start on system boot
```bash
pm2 startup systemd
# Copy and execute the command that PM2 prints in the terminal
```

---

## 8. Configure Nginx Reverse Proxy

Create an Nginx configuration file:
```bash
sudo nano /etc/nginx/sites-available/fransdelian.com
```

Paste the following block (replace `fransdelian.com` with your actual domain):
```nginx
# Cache static uploads directly from disk for optimal performance
server {
    server_name fransdelian.com www.fransdelian.com;

    # Maximum file upload size for RAW/High-Res TIFF/WebP uploads
    client_max_body_size 25M;

    # Gzip Compression
    gzip on;
    gzip_proxied any;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml image/svg+xml;
    gzip_vary on;

    # Direct static serving of uploads folder
    location /uploads/ {
        alias /var/lib/frans-delian/uploads/;
        access_log off;
        expires 30d;
        add_header Cache-Control "public, max-age=2592000, immutable";
        try_files $uri =404;
    }

    # Next.js Static Cache
    location /_next/static/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_cache_bypass $http_upgrade;
        expires 365d;
        access_log off;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # Dynamic Next.js Application Proxy
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    listen 80;
}
```

Enable the configuration and reload Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/fransdelian.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 9. Obtain SSL Certificate with Certbot

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d fransdelian.com -d www.fransdelian.com
```

Certbot automatically schedules certificate renewals via systemd timers.

---

## 10. Automated Database Backups (Cron)

Make backup scripts executable:
```bash
chmod +x scripts/backup-db.sh
chmod +x scripts/restore-db.sh
```

Add a daily automated backup job via `crontab`:
```bash
crontab -e
```

Add this line to run backups every night at 02:30 AM:
```cron
30 2 * * * /var/www/frans-delian/scripts/backup-db.sh >> /var/log/frans_backup.log 2>&1
```

---

## 11. Maintenance & Troubleshooting

| Action | Command |
|---|---|
| View application logs | `pm2 logs frans-delian-web` |
| Restart application | `pm2 reload frans-delian-web` |
| View Nginx access log | `sudo tail -f /var/log/nginx/access.log` |
| View Nginx error log | `sudo tail -f /var/log/nginx/error.log` |
| Manual database backup | `./scripts/backup-db.sh` |
| Database restore | `./scripts/restore-db.sh /var/backups/frans-delian/frans_delian_TIMESTAMP.sql.gz` |

