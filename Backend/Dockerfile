FROM node:12-alpine

WORKDIR /home/
COPY ./ ./
RUN npm install
RUN npm run build

FROM node:12-alpine
WORKDIR /home/
RUN mkdir dist
COPY --from=0 /home/dist/ ./dist/
COPY ./package.json ./
COPY ./package-lock.json ./
ARG JWT_SECRET
ARG TYPEORM_CONNECTION
ARG TYPEORM_HOST
ARG TYPEORM_USERNAME
ARG TYPEORM_PASSWORD
ARG TYPEORM_DATABASE
ARG TYPEORM_PORT
ARG TYPEORM_ENTITIES
ENV JWT_SECRET=${JWT_SECRET}
ENV TYPEORM_CONNECTION=${TYPEORM_CONNECTION}
ENV TYPEORM_HOST=${TYPEORM_HOST}
ENV TYPEORM_USERNAME=${TYPEORM_USERNAME}
ENV TYPEORM_PASSWORD=${TYPEORM_PASSWORD}
ENV TYPEORM_DATABASE=${TYPEORM_DATABASE}
ENV TYPEORM_PORT=${TYPEORM_PORT}
ENV TYPEORM_ENTITIES=${TYPEORM_ENTITIES}

RUN echo JWT_SECRET

RUN npm install --only=prod

CMD ["node", "dist/main.js"]
