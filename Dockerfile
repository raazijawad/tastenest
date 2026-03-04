# Stage 1 - Build Frontend (Vite + React SSR)
FROM node:22-alpine AS frontend
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build:ssr

# Stage 2 - Backend (Laravel + PHP + Composer)
FROM php:8.2-fpm-alpine AS backend

# Install system dependencies
RUN apk add --no-cache \
    git curl unzip libzip-dev zip oniguruma-dev \
    && docker-php-ext-install pdo pdo_mysql mbstring zip \
    && apk add --no-cache $PHPIZE_DEPS \
    && pecl install xdebug \
    && docker-php-ext-enable xdebug

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Copy app files
COPY . .

# Copy built frontend from Stage 1
COPY --from=frontend /app/public ./public
COPY --from=frontend /app/node_modules/.vite ./node_modules/.vite

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Laravel setup
RUN php artisan config:cache \
    && php artisan route:cache \
    && php artisan view:cache \
    && php artisan inertia:start-ssr

# Set proper permissions
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

EXPOSE 9000
CMD ["php-fpm"]
