# PRODUCT REQUIREMENTS DOCUMENT (PRD)
## FRANS DELIAN — PHOTOGRAPHY PORTFOLIO WEBSITE

**Versi:** 2.0  
**Tanggal:** 30 Oktober 2026  
**Status:** Spesifikasi Pengembangan  
**Tagline:** Stories Beyond The Frame

---

## 1. Ringkasan Proyek

Frans Delian Photography Portfolio adalah website portofolio profesional fotografer dengan tampilan visual sinematik, minimalis, elegan, dan editorial.

Website dirancang untuk menampilkan karya fotografi, cerita di balik karya, dokumentasi event, serta profil fotografer. Website juga dilengkapi CMS admin mandiri agar seluruh konten dapat dikelola tanpa mengubah kode program.

### Keputusan teknologi utama

| Komponen | Teknologi |
|---|---|
| Frontend | Next.js |
| Backend | Next.js Server Actions / Route Handlers |
| Bahasa | TypeScript |
| Database | MySQL |
| ORM | Prisma |
| CMS | Custom Admin CMS |
| Authentication | Secure session-based authentication |
| Image Storage | Local VPS storage |
| Web Server | Nginx |
| Process Manager | PM2 |
| Operating System | Ubuntu VPS |
| Hosting | Sumopod VPS |

**Catatan:** Sanity CMS tidak digunakan dalam arsitektur baru ini.

## 2. Tujuan Website

1. Menampilkan karya fotografi secara profesional.
2. Membangun identitas visual dan personal branding Frans Delian.
3. Menyediakan halaman Gallery, Stories, Events, About, dan Contact.
4. Memungkinkan admin mengelola konten melalui dashboard.
5. Menyimpan data website pada database MySQL.
6. Memiliki sistem upload gambar yang tersimpan secara permanen di VPS.
7. Menyediakan sistem backup dan pemulihan database serta gambar.
8. Menyiapkan website agar dapat diakses melalui IP VPS terlebih dahulu dan domain ketika sudah tersedia.

## 3. Konsep Desain dan Identitas Visual

### Brand identity

- Nama: Frans Delian
- Tagline: Stories Beyond The Frame
- Karakter: Cinematic, artistic, premium, elegant, timeless.
- Gaya desain: Dark editorial photography portfolio.

### Warna utama

| Elemen | Warna |
|---|---|
| Background | #080808 |
| Secondary Background | #171717 |
| Primary Text | #F2EFE9 |
| Secondary Text | #A7A7A7 |
| Accent | #C6AA7B |

### Prinsip desain

- Mengutamakan kualitas dan ukuran visual foto.
- Menggunakan tipografi editorial yang elegan.
- Navigasi minimalis dan intuitif.
- Animasi transisi yang halus dan tidak berlebihan.
- Layout responsif untuk desktop, tablet, dan smartphone.
- Mendukung preferensi reduced motion.
- Menggunakan placeholder ketika foto asli belum tersedia.

## 4. Struktur Halaman Website

### Halaman publik

| URL | Fungsi |
|---|---|
| `/` | Homepage |
| `/gallery` | Daftar karya fotografi |
| `/gallery/[slug]` | Detail proyek fotografi |
| `/stories` | Daftar artikel dan cerita |
| `/stories/[slug]` | Detail cerita |
| `/events` | Daftar dokumentasi event |
| `/events/[slug]` | Detail event |
| `/about` | Profil fotografer |
| `/contact` | Formulir kontak |

### Halaman administrator

| URL | Fungsi |
|---|---|
| `/admin/login` | Login admin |
| `/admin` | Dashboard |
| `/admin/gallery` | Pengelolaan galeri |
| `/admin/stories` | Pengelolaan stories |
| `/admin/events` | Pengelolaan events |
| `/admin/profile` | Pengelolaan profil |
| `/admin/messages` | Pengelolaan pesan masuk |
| `/admin/settings` | Pengaturan website |

## 5. Fitur Website Publik

### 5.1 Homepage

Homepage menampilkan:

- Hero section dengan foto unggulan.
- Nama Frans Delian dan tagline.
- Pengantar singkat fotografer.
- Featured photography projects.
- Pilihan karya terbaru.
- Story pilihan.
- Event pilihan.
- Call-to-action menuju halaman Contact.
- Footer dengan informasi dan tautan media sosial.

### 5.2 Gallery

Fitur:

- Menampilkan koleksi proyek fotografi.
- Grid atau masonry layout.
- Foto cover untuk setiap proyek.
- Judul, kategori, dan deskripsi proyek.
- Halaman detail setiap proyek.
- Lightbox untuk melihat foto berukuran besar.
- Navigasi foto sebelumnya dan berikutnya.
- Responsive image loading.
- Hanya proyek berstatus Published yang tampil di publik.

### 5.3 Stories

Fitur:

- Daftar artikel atau cerita fotografi.
- Cover image.
- Judul dan ringkasan.
- Tanggal publikasi.
- Halaman detail artikel.
- Konten artikel dengan format yang mudah dibaca.
- SEO metadata per artikel.

### 5.4 Events

Fitur:

- Daftar dokumentasi event.
- Judul dan deskripsi event.
- Lokasi dan tanggal event.
- Cover image.
- Halaman detail event.
- Galeri dokumentasi jika diperlukan.

### 5.5 About

Menampilkan:

- Foto profil fotografer.
- Nama dan biografi.
- Tagline.
- Email profesional.
- Tautan media sosial.
- Informasi tambahan mengenai pengalaman dan pendekatan fotografi.

### 5.6 Contact

Formulir kontak meliputi:

- Nama.
- Email.
- Subjek.
- Pesan.

Setelah dikirim, data disimpan ke MySQL. Sistem dapat mengirimkan notifikasi email kepada administrator melalui SMTP.

## 6. Custom Admin CMS

Admin CMS dikembangkan langsung di dalam aplikasi Next.js.

### 6.1 Dashboard

Menampilkan ringkasan:

- Jumlah proyek galeri.
- Jumlah stories.
- Jumlah events.
- Jumlah pesan masuk.
- Konten terbaru.
- Status publikasi.

### 6.2 Gallery Management

Admin dapat:

- Menambahkan proyek.
- Mengedit proyek.
- Menghapus proyek.
- Mengubah judul dan deskripsi.
- Membuat slug otomatis.
- Mengatur kategori.
- Upload cover image.
- Upload banyak foto.
- Mengatur urutan foto.
- Mengatur featured project.
- Mengubah status Draft, Published, atau Archived.

### 6.3 Stories Management

Admin dapat:

- Membuat artikel.
- Mengedit artikel.
- Menghapus artikel.
- Mengatur judul dan slug.
- Mengatur ringkasan.
- Mengisi isi artikel.
- Upload cover image.
- Mengatur tanggal publikasi.
- Mengatur status publikasi.

### 6.4 Events Management

Admin dapat:

- Membuat event.
- Mengedit event.
- Menghapus event.
- Mengatur judul dan deskripsi.
- Mengatur lokasi.
- Mengatur tanggal mulai dan selesai.
- Upload cover image.
- Mengatur status publikasi.

### 6.5 Profile Management

Admin dapat mengubah:

- Nama fotografer.
- Tagline.
- Biografi.
- Foto profil.
- Email.
- Social media links.

### 6.6 Messages Management

Admin dapat:

- Melihat pesan masuk.
- Membaca detail pesan.
- Mengubah status pesan.
- Menandai pesan sebagai sudah dibaca.
- Menghapus pesan.

### 6.7 Site Settings

Admin dapat mengelola pengaturan website seperti:

- Website title.
- Meta description.
- Logo.
- Favicon.
- Social media links.
- Email kontak.
- Homepage featured content.

## 7. Database MySQL dan Prisma

Database utama menggunakan MySQL. Prisma digunakan sebagai ORM untuk mengelola struktur database dan komunikasi antara aplikasi dengan database.

### 7.1 Daftar tabel

| Tabel | Fungsi |
|---|---|
| `AdminUser` | Data administrator |
| `AdminSession` | Sesi login administrator |
| `PhotoProject` | Data proyek fotografi |
| `Photo` | Data foto dalam proyek |
| `Story` | Artikel dan cerita |
| `Event` | Dokumentasi event |
| `PhotographerProfile` | Profil fotografer |
| `SiteSetting` | Pengaturan website |
| `ContactMessage` | Pesan dari pengunjung |
| `AuditLog` | Catatan aktivitas admin |

### 7.2 Spesifikasi field utama

**AdminUser**
- id
- name
- email (unique)
- passwordHash
- role
- isActive
- lastLoginAt
- createdAt
- updatedAt

**AdminSession**
- id
- adminUserId
- tokenHash
- expiresAt
- createdAt

**PhotoProject**
- id
- title
- slug (unique)
- description
- category
- coverImageId
- status
- featured
- sortOrder
- publishedAt
- createdAt
- updatedAt

**Photo**
- id
- projectId
- storageKey
- altText
- caption
- width
- height
- sortOrder
- createdAt

**Story**
- id
- title
- slug (unique)
- excerpt
- body
- coverImageId
- status
- publishedAt
- createdAt
- updatedAt

**Event**
- id
- title
- slug (unique)
- description
- venue
- startsAt
- endsAt
- coverImageId
- status
- createdAt
- updatedAt

**PhotographerProfile**
- id
- displayName
- biography
- tagline
- portraitImageId
- email
- socialLinks
- updatedAt

**SiteSetting**
- id
- key (unique)
- value
- updatedAt

**ContactMessage**
- id
- name
- email
- subject
- message
- status
- createdAt

**AuditLog**
- id
- adminUserId
- action
- entityType
- entityId
- createdAt

### 7.3 Ketentuan database

- Gunakan tipe ID yang konsisten, misalnya UUID atau integer autoincrement.
- Slug harus unik.
- Gunakan foreign key untuk relasi antartabel.
- Tambahkan index untuk kolom yang sering dicari seperti slug, status, dan publishedAt.
- Tentukan aturan penghapusan relasi secara eksplisit.
- Gunakan tipe data teks panjang untuk konten artikel dan deskripsi.
- Gunakan tipe JSON hanya untuk field yang memang membutuhkan data terstruktur dan didukung konfigurasi Prisma/MySQL.
- Jangan menyimpan file foto sebagai BLOB di database.
- Database menyimpan metadata dan lokasi file foto.

## 8. Sistem Login dan Keamanan Admin

Sistem autentikasi harus aman dan hanya dapat digunakan administrator yang terdaftar.

### Ketentuan

1. Tidak ada registrasi admin publik.
2. Akun admin pertama dibuat melalui script CLI atau proses seed.
3. Password disimpan dalam bentuk hash menggunakan Argon2id atau algoritma password hashing yang setara.
4. Gunakan session-based authentication.
5. Token sesi harus acak dan kuat.
6. Simpan hash token sesi di database, bukan token mentah.
7. Cookie sesi menggunakan HttpOnly dan SameSite=Lax.
8. Gunakan Secure cookie ketika website sudah menggunakan HTTPS.
9. Terapkan masa berlaku sesi dan mekanisme logout/revocation.
10. Terapkan pembatasan percobaan login.
11. Semua Server Actions dan Route Handlers yang mengubah data wajib memeriksa autentikasi dan otorisasi di server.
12. Lindungi aplikasi dari CSRF, XSS, SQL injection, dan akses tidak sah.
13. Jangan menyimpan password atau secret di source code.
14. Jangan mengekspos secret melalui variabel `NEXT_PUBLIC_`.
15. Pesan error kepada pengguna tidak boleh menampilkan stack trace atau informasi sensitif.

## 9. Sistem Upload Gambar

Semua foto diunggah melalui Admin CMS dan disimpan di VPS.

### Lokasi penyimpanan

Direkomendasikan menggunakan:

`/var/lib/frans-delian/uploads`

Lokasi harus dapat dikonfigurasi menggunakan environment variable:

`UPLOAD_DIR`

### Format yang didukung

- JPEG / JPG
- PNG
- WebP

SVG dan HTML tidak diterima pada tahap awal.

### Validasi upload

- Validasi ekstensi file.
- Validasi MIME type.
- Validasi signature atau magic bytes.
- Batas ukuran file.
- Batas jumlah file per upload.
- Validasi dimensi gambar.
- Nama file dibuat secara acak dan tidak menggunakan nama asli sebagai nama penyimpanan.
- Cegah path traversal.
- File tidak boleh dieksekusi sebagai program.
- Gunakan permission filesystem yang terbatas.

### Metadata gambar

Setiap gambar dapat memiliki:

- Alt text.
- Caption.
- Width.
- Height.
- Urutan tampil.
- Referensi proyek.

File yang masih digunakan oleh konten lain tidak boleh dihapus secara tidak sengaja.

**Penting:** Folder upload harus berada di luar folder source code dan folder `.next`, sehingga foto tidak hilang saat aplikasi diperbarui atau dibangun ulang.

## 10. Validasi Contact Form

Validasi dilakukan di sisi server, bukan hanya browser.

Ketentuan:

- Nama wajib diisi.
- Email harus memiliki format valid.
- Subjek wajib diisi.
- Pesan wajib diisi.
- Terapkan batas panjang input.
- Terapkan rate limiting.
- Gunakan honeypot atau CAPTCHA jika diperlukan.
- Pesan disimpan ke database sebelum notifikasi email dikirim.
- Jika SMTP gagal, pesan tetap tersimpan.
- Pengunjung tidak boleh membaca pesan milik pengunjung lain.
- Kredensial SMTP hanya tersedia di server.

## 11. Environment Configuration

Gunakan file `.env` untuk konfigurasi server.

Contoh variabel:

```env
DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/frans_delian"

SESSION_SECRET="REPLACE_WITH_SECURE_RANDOM_SECRET"

SITE_URL="http://IP_VPS"

UPLOAD_DIR="/var/lib/frans-delian/uploads"

SMTP_HOST=""
SMTP_PORT=""
SMTP_USER=""
SMTP_PASSWORD=""
CONTACT_EMAIL_TO=""

NODE_ENV="production"
```

Ketentuan:

- Sediakan `.env.example`.
- File `.env` masuk `.gitignore`.
- Jangan commit secret ke Git.
- Gunakan password database yang kuat.
- Gunakan user database khusus aplikasi dengan hak akses minimum yang diperlukan.

## 12. Struktur Folder Aplikasi

Struktur yang direkomendasikan:

```text
frans-delian/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── public/
├── src/
│   ├── app/
│   │   ├── (public)/
│   │   │   ├── page.tsx
│   │   │   ├── gallery/
│   │   │   ├── stories/
│   │   │   ├── events/
│   │   │   ├── about/
│   │   │   └── contact/
│   │   ├── admin/
│   │   │   ├── login/
│   │   │   ├── gallery/
│   │   │   ├── stories/
│   │   │   ├── events/
│   │   │   ├── profile/
│   │   │   ├── messages/
│   │   │   └── settings/
│   │   └── api/
│   ├── components/
│   ├── lib/
│   │   ├── auth/
│   │   ├── db/
│   │   ├── validation/
│   │   ├── storage/
│   │   └── email/
│   └── types/
├── scripts/
│   └── create-admin.ts
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

Struktur final dapat disesuaikan dengan struktur project yang sudah ada, tanpa membuat duplikasi komponen atau konfigurasi.

## 13. Database Migration

Prisma Migrate digunakan untuk mengelola perubahan struktur database.

### Development

Contoh alur:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### Production

```bash
npx prisma migrate deploy
npx prisma generate
npm run build
```

Ketentuan:

- Semua migration harus masuk version control.
- Migration production harus ditinjau sebelum dijalankan.
- Backup database sebelum migration penting.
- Jangan menggunakan `prisma migrate dev` pada production.
- Jangan menggunakan `prisma db push` sebagai pengganti migration production.
- Pastikan versi Prisma yang digunakan konsisten dengan konfigurasi project. Versi Prisma terbaru dapat membutuhkan konfigurasi tambahan seperti `prisma.config.ts`.
- Rollback kode aplikasi tidak otomatis membatalkan perubahan database.

## 14. Deployment di Sumopod Ubuntu VPS

### Kondisi awal

- Hosting: Sumopod VPS.
- OS: Ubuntu.
- Domain: Belum tersedia.
- Akses website sementara menggunakan IP publik VPS.
- Source code masih dikembangkan di komputer lokal melalui Antigravity.

### Komponen server

- Ubuntu LTS.
- Node.js versi yang kompatibel dengan versi Next.js project.
- MySQL Server.
- Nginx.
- PM2.
- Git.
- Build tools yang dibutuhkan aplikasi.

### Arsitektur deployment

```text
Pengunjung
    |
    v
Public IP VPS / Domain
    |
    v
Nginx Reverse Proxy
    |
    v
Next.js Application
127.0.0.1:3000
    |
    v
Prisma ORM
    |
    v
MySQL Database

Next.js Application
    |
    v
VPS Upload Directory
```

### Ketentuan deployment

1. Aplikasi berjalan sebagai user Linux non-root.
2. Next.js berjalan di localhost port 3000.
3. Nginx menjadi reverse proxy.
4. Port 3000 tidak dibuka untuk akses publik.
5. MySQL hanya menerima koneksi lokal jika tidak ada kebutuhan remote database.
6. Port MySQL 3306 tidak dibuka ke internet.
7. Gunakan PM2 untuk menjalankan dan menjaga aplikasi tetap aktif.
8. Pastikan aplikasi berjalan kembali setelah VPS reboot.
9. Gunakan firewall dan pertahankan port SSH yang benar agar akses server tidak terputus.
10. Akses sementara melalui HTTP menggunakan IP VPS.
11. Setelah domain tersedia, konfigurasi DNS dan HTTPS menggunakan sertifikat SSL.
12. Jangan melakukan perubahan server atau DNS tanpa persetujuan pemilik VPS.

## 15. Prosedur Update Aplikasi

Setiap pembaruan aplikasi harus mengikuti urutan:

1. Backup database.
2. Backup folder upload jika diperlukan.
3. Ambil source code terbaru.
4. Install dependency berdasarkan lockfile.
5. Validasi environment.
6. Jalankan migration production.
7. Generate Prisma Client.
8. Build aplikasi.
9. Restart aplikasi melalui PM2.
10. Periksa homepage dan halaman publik.
11. Periksa login admin.
12. Periksa upload gambar dan contact form.

Siapkan prosedur rollback aplikasi dan pemulihan database jika deployment gagal.

## 16. Backup dan Restore

Backup harus mencakup dua komponen:

### Database

Gunakan `mysqldump` atau mekanisme backup MySQL yang sesuai.

### Media

Backup folder:

`/var/lib/frans-delian/uploads`

### Kebijakan backup awal

- Backup database setiap hari.
- Retensi backup awal 7–14 hari.
- Backup media setiap hari atau setelah perubahan media dalam jumlah besar.
- Simpan salinan terenkripsi di lokasi terpisah dari VPS.
- Batasi akses ke file backup.
- Lakukan pengujian restore secara berkala.
- Dokumentasikan langkah restore.

Backup belum dianggap berhasil hanya karena file backup terbentuk. Proses pemulihan harus diuji.

## 17. Non-Functional Requirements

### Performance

- Optimasi ukuran gambar.
- Gunakan responsive image.
- Lazy loading untuk gambar yang belum terlihat.
- Pagination atau batas jumlah item pada daftar panjang.
- Hindari query database berulang yang tidak diperlukan.

### Security

- Autentikasi dan otorisasi di server.
- Validasi semua input.
- Rate limiting.
- Secret management.
- Database tidak terbuka ke publik.
- Backup terenkripsi.

### Accessibility

- Alt text pada foto.
- Navigasi keyboard.
- Kontras teks memadai.
- Label formulir yang jelas.
- Dukungan reduced motion.

### SEO

- Metadata per halaman.
- Open Graph.
- Sitemap XML.
- Robots.txt.
- URL slug yang bersih.
- Canonical URL setelah domain tersedia.

### Reliability

- Aplikasi berjalan otomatis setelah reboot.
- File upload persisten.
- Log aplikasi tersedia.
- Backup dan restore terdokumentasi.

## 18. Acceptance Criteria

Website dinyatakan memenuhi kebutuhan apabila:

1. Semua halaman publik dapat dibuka dengan baik.
2. Desain responsif di desktop dan smartphone.
3. Gallery dapat menampilkan foto dan detail proyek.
4. Admin dapat login dan logout dengan aman.
5. Admin dapat melakukan CRUD Gallery, Stories, Events, dan Profile.
6. Admin dapat mengelola pesan masuk.
7. Konten Draft tidak muncul di halaman publik.
8. Upload gambar berhasil dan file tersimpan di folder permanen VPS.
9. Upload dengan format tidak diizinkan ditolak.
10. Contact form tervalidasi dan pesan tersimpan di MySQL.
11. Kegagalan SMTP tidak menghilangkan pesan.
12. Prisma migration berjalan pada production.
13. Backup database dan media dapat dipulihkan.
14. Nginx dapat meneruskan permintaan ke Next.js.
15. PM2 menjaga aplikasi tetap berjalan setelah reboot.
16. Port database dan port internal aplikasi tidak terbuka untuk publik.
17. Build, lint, typecheck, dan pengujian yang tersedia berhasil.

## 19. Risiko dan Mitigasi

| Risiko | Mitigasi |
|---|---|
| RAM VPS tidak cukup untuk build | Periksa kapasitas VPS dan pertimbangkan build lokal |
| Foto hilang saat deploy | Simpan upload di luar folder aplikasi |
| Database rusak saat migration | Backup dan review migration |
| Admin diserang brute force | Rate limiting dan password kuat |
| Spam contact form | Honeypot, rate limiting, CAPTCHA bila perlu |
| Secret bocor | `.env` dan server-only configuration |
| Website belum HTTPS | Gunakan HTTP sementara melalui IP, aktifkan HTTPS setelah domain tersedia |
| Backup tidak dapat dipulihkan | Lakukan restore test berkala |

## 20. Deliverables

Hasil akhir pengembangan harus mencakup:

- Website publik Frans Delian.
- Custom Admin CMS.
- Database MySQL.
- Prisma schema.
- Prisma migrations.
- Sistem autentikasi admin.
- CRUD Gallery, Stories, Events, Profile.
- Sistem upload gambar.
- Contact form dan penyimpanan pesan.
- Environment example.
- Dokumentasi instalasi.
- Dokumentasi deployment Ubuntu VPS.
- Konfigurasi Nginx dan PM2.
- Dokumentasi backup dan restore.
- Pengujian dasar aplikasi.

## 21. Instruksi Implementasi untuk Antigravity

Gunakan instruksi berikut sebagai arahan pengembangan:

1. Audit seluruh project Frans Delian yang sudah tersedia sebelum melakukan perubahan.
2. Pertahankan desain dan identitas visual cinematic dark editorial dengan tagline “Stories Beyond The Frame”.
3. Hapus seluruh ketergantungan Sanity CMS, termasuk konfigurasi, SDK, query, schema, dan environment variable yang tidak lagi digunakan.
4. Gunakan MySQL sebagai database utama dan Prisma sebagai ORM.
5. Bangun Custom Admin CMS langsung di Next.js.
6. Buat database schema dan migration terlebih dahulu.
7. Implementasikan autentikasi admin yang aman sebelum CRUD.
8. Implementasikan CRUD Gallery, Stories, Events, Profile, Settings, dan Messages.
9. Implementasikan upload gambar dengan penyimpanan permanen di VPS.
10. Implementasikan contact form dengan validasi server-side.
11. Pastikan hanya konten Published yang tampil kepada publik.
12. Optimalkan SEO, responsivitas, aksesibilitas, dan performa.
13. Siapkan konfigurasi deployment untuk Ubuntu Sumopod VPS menggunakan Nginx dan PM2.
14. Siapkan dokumentasi migration, backup, dan restore.
15. Jalankan lint, typecheck, test, dan production build.
16. Perbaiki seluruh error sebelum menyatakan implementasi selesai.
17. Jangan menaruh secret di source code.
18. Jangan mengasumsikan detail VPS yang belum diketahui.
19. Jangan melakukan deployment atau perubahan DNS tanpa persetujuan eksplisit.
20. Buat laporan akhir yang menjelaskan file yang diubah, fitur yang selesai, hasil pengujian, environment variable yang diperlukan, dan langkah deployment.

## 22. Informasi yang Perlu Dikonfirmasi Sebelum Go-Live

- Versi Ubuntu dan arsitektur VPS.
- Kapasitas RAM dan disk VPS
- Akses sudo dan SSH.
- Versi Node.js yang kompatibel.
- Repository Git dan package lockfile.
- Penyedia SMTP.
- Batas ukuran upload gambar.
- Kebutuhan thumbnail atau image processing.
- Kebijakan retensi pesan kontak.
- Domain dan konfigurasi HTTPS.
- Lokasi penyimpanan backup di luar VPS.

---

**Akhir Dokumen — PRD Frans Delian v2.0**

Dokumen ini menggantikan spesifikasi sebelumnya yang menggunakan Sanity CMS. Seluruh implementasi baru harus mengacu pada MySQL, Prisma, dan Custom Admin CMS di Next.js.