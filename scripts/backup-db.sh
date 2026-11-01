#!/usr/bin/env bash
# =============================================================================
# Frans Delian Photography Portfolio — Database Automated Backup Script
# Sumopod Ubuntu VPS Deployment
# =============================================================================

set -euo pipefail

# Configuration
BACKUP_DIR="${BACKUP_DIR:-/var/backups/frans-delian}"
RETENTION_DAYS="${RETENTION_DAYS:-14}"
TIMESTAMP="$(date +'%Y%m%d_%H%M%S')"
BACKUP_FILE="${BACKUP_DIR}/frans_delian_${TIMESTAMP}.sql.gz"

# Source environment variables if .env exists
if [ -f "$(dirname "$0")/../.env" ]; then
  # shellcheck disable=SC1091
  export $(grep -v '^#' "$(dirname "$0")/../.env" | xargs)
fi

DB_USER="${DB_USER:-root}"
DB_PASSWORD="${DB_PASSWORD:-}"
DB_NAME="${DB_NAME:-frans_delian}"
DB_HOST="${DB_HOST:-127.0.0.1}"
DB_PORT="${DB_PORT:-3306}"

# Ensure backup directory exists
mkdir -p "${BACKUP_DIR}"
chmod 700 "${BACKUP_DIR}"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Starting MySQL backup for ${DB_NAME}..."

# Perform mysqldump with gzip compression
if [ -n "${DB_PASSWORD}" ]; then
  mysqldump -h "${DB_HOST}" -P "${DB_PORT}" -u "${DB_USER}" -p"${DB_PASSWORD}" \
    --single-transaction --quick --routines --triggers "${DB_NAME}" | gzip > "${BACKUP_FILE}"
else
  mysqldump -h "${DB_HOST}" -P "${DB_PORT}" -u "${DB_USER}" \
    --single-transaction --quick --routines --triggers "${DB_NAME}" | gzip > "${BACKUP_FILE}"
fi

chmod 600 "${BACKUP_FILE}"
echo "[$(date '+%Y-%m-%d %H:%M:%S')] Backup successfully created: ${BACKUP_FILE} ($(du -h "${BACKUP_FILE}" | cut -f1))"

# Prune backups older than RETENTION_DAYS
echo "[$(date '+%Y-%m-%d %H:%M:%S')] Cleaning backups older than ${RETENTION_DAYS} days..."
find "${BACKUP_DIR}" -type f -name "frans_delian_*.sql.gz" -mtime +"${RETENTION_DAYS}" -delete

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Backup process complete."
