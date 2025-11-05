FROM node:22-bullseye AS build

RUN apt-get update && apt-get install -y \
  libvips-dev \
  build-essential \
  python-is-python3 \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm ci --include=optional

COPY . .
RUN npm run build

FROM nginx:1.27-bookworm AS runtime
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
