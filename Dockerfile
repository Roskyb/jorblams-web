FROM node:22 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
RUN npm install --force @img/sharp-linuxmusl-arm64
COPY . .
RUN npm run build

FROM nginx:alpine AS runtime
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80