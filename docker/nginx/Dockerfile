FROM nginx:latest

COPY certs/ /etc/nginx/certs

COPY app.conf /etc/nginx/sites-enabled/default

COPY nginx.conf /etc/nginx/nginx.conf

RUN update-ca-certificates

EXPOSE 80
EXPOSE 443