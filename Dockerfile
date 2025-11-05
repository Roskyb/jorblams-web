FROM node:22 AS build

# 1) Dependencias necesarias para compilar sharp
RUN apt-get update && apt-get install -y \
    libvips-dev \
    build-essential \
    python3 \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm ci

# 2) Fuerza a sharp a recompilar dentro del contenedor
RUN npm rebuild sharp --verbose

COPY . .
RUN npm run build

# ------------------------------

FROM nginx:1.27-bookworm AS runtime

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
