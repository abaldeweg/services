ARG VITE_BASE_URL

# build stage
FROM node:lts-alpine as build-stage

ARG VITE_BASE_URL
ENV VITE_BASE_URL=$VITE_BASE_URL

WORKDIR /usr/app

COPY . .

RUN npm install -g pnpm
RUN pnpm install
RUN pnpm -F <%= name %> build

# production stage
FROM httpd:2.4 as production-stage

ARG VITE_BASE_URL
ENV VITE_BASE_URL=$VITE_BASE_URL

COPY ./packages/<%= name %>/docker/httpd.conf /usr/local/apache2/conf/httpd.conf

COPY --from=build-stage /usr/app/packages/<%= name %>/dist /usr/local/apache2/htdocs${VITE_BASE_URL}

EXPOSE 80
