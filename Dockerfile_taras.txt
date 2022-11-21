# build environment
FROM node:16 as build
WORKDIR /app
RUN rm -rf /app/*
RUN git clone http://gitlab-ci-token:glpat-KDERMg9A7Dq4bb3MA2zz@gitlab.larch/WEB/horn /app
ENV PATH /app/node_modules/.bin:$PATH
RUN cd /app/ui && npm install --force
RUN cd /app/ui && npm install react-scripts@5.0.1 -g --silent
RUN cd /app/ui && npm run build

# production environment
FROM nginx:1.16.0-alpine
COPY --from=build /app/ui/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]