FROM node:12-alpine

WORKDIR /home/
COPY ./ ./
RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=0 /home/dist/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/nginx.conf

CMD nginx -g "daemon off; error_log /dev/stderr error;"
