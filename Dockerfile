# ---------- Etapa 1: compilar la app Ionic/Angular ----------
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build -- --configuration production

# ---------- Etapa 2: servir la app con Nginx ----------
FROM nginx:1.27-alpine
COPY --from=build /app/www /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]