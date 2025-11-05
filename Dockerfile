FROM node:22 AS build

# ✅ Instalar dependencias necesarias para sharp/libvips
RUN apt-get update && apt-get install -y \
    libvips-dev \
    build-essential \
    python3 \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package*.json ./

RUN npm ci

COPY . .
RUN npm run build

# ------------------------------

FROM nginx:alpine AS runtime

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
