FROM nginx:stable-alpine
WORKDIR frontend/app
RUN mkdir ./build
ADD frontend/app/build ./build
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d
CMD ["nginx", "-g", "daemon off;"]
