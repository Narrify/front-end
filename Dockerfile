FROM node:16 AS build

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

#SEGUNDA ETAPA
FROM nginx:alpine

COPY --from=build /app/public /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80


CMD ["nginx", "-g", "daemon off;"]

