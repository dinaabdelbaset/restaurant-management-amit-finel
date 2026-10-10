#!/bin/bash
set -e

# Update Apache listening port to Render's $PORT (Render assigns a dynamic port like 10000)
if [ -n "$PORT" ]; then
    sed -i "s/80/$PORT/g" /etc/apache2/sites-available/000-default.conf /etc/apache2/ports.conf
fi

# Create SQLite database file if DB_CONNECTION is sqlite or if database file does not exist
mkdir -p /var/www/html/database
if [ ! -f /var/www/html/database/database.sqlite ]; then
    touch /var/www/html/database/database.sqlite
    chown www-data:www-data /var/www/html/database/database.sqlite
fi

# Ensure storage and bootstrap directories are writable
chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache /var/www/html/database
chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache /var/www/html/database

# Run Laravel optimizations and migrations
php artisan config:cache || true
php artisan route:cache || true
php artisan migrate --force || true

# Start Apache in the foreground
exec apache2-foreground
