# Description: Dockerfile for the app-cart service
#Aqui le ponemos la etiqueta de la version de node que vamos a usar
FROM node:18.18 AS builder

#Aqui le decimos que cree un directorio en la imagen de docker y el codigo fuente de la aplicacion
RUN mkdir -p /usr/src/angular
WORKDIR /usr/src/angular
COPY . /usr/src/angular

#Aqui le decimos que instale las dependencias de la aplicacion y que haga el build de la aplicacion
RUN npm install
RUN node_modules/.bin/ng build --configuration=production --aot --optimization

#Aqui le decimos que cree una imagen de nginx y que copie el build de la aplicacion en la carpeta de nginx
FROM nginx
WORKDIR /usr/share/nginx/html/
COPY --from=builder /usr/src/angular/dist/app-cart/browser/ /usr/share/nginx/html
EXPOSE 80 443

#Aqui le decimos que inicie el servicio de nginx
CMD nginx -g 'daemon off;'
