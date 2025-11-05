FROM node:22 AS build

# ✅ Instalar dependencias necesarias ANTES de npm ci
RUN apt-get update && apt-get install -y \
    libvips-dev \
    build-essential \
    python3 \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./

# ✅ Reinstalar sharp correctamente dentro del contenedor
RUN npm ci

COPY . .
RUN npm run build

# ------------------------------

# ✅ Runtime basado en Debian (NO Alpine)
FROM nginx:1.27-bookworm

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
