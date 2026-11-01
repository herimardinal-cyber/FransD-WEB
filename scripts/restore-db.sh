#!/usr/bin/env bash
# =============================================================================
# Frans Delian Photography Portfolio — Database Restore Script
# Sumopod Ubuntu VPS Deployment
# =============================================================================

set -euo pipefail

if [ $# -lt 1 ]; then
  echo "Usage: $0 <path-to-backup-file.sql.gz>"
  exit 1
fi

BACKUP_FILE="$1"

if [ ! -f "${BACKUP_FILE}" ]; then
  echo "Error: Backup file '${BACKUP_FILE}' does not exist."
  exit 1
fi

# Source .env
if [ -f "$(dirname "$0")/../.env" ]; then
  # shellcheck disable=SC1091
  export $(grep -v '^#' "$(dirname "$0")/../.env" | xargs)
fi

DB_USER="${DB_USER:-root}"
DB_PASSWORD="${DB_PASSWORD:-}"
DB_NAME="${DB_NAME:-frans_delian}"
DB_HOST="${DB_HOST:-127.0.0.1}"
DB_PORT="${DB_PORT:-3306}"

echo "WARNING: This will overwrite the database '${DB_NAME}' on ${DB_HOST}."
read -p "Are you sure you want to proceed? (yes/no): " CONFIRM
if [ "${CONFIRM}" != "yes" ]; then
  echo "Restore aborted."
  exit 0
fi

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Restoring database from ${BACKUP_FILE}..."

if [ -n "${DB_PASSWORD}" ]; then
  gunzip -c "${BACKUP_FILE}" | mysql -h "${DB_HOST}" -P "${DB_PORT}" -u "${DB_USER}" -p"${DB_PASSWORD}" "${DB_NAME}"
else
  gunzip -c "${BACKUP_FILE}" | mysql -h "${DB_HOST}" -P "${DB_PORT}" -u "${DB_USER}" "${DB_NAME}"
fi

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Database restore complete."
