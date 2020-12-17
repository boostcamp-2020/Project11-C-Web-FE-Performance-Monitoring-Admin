FROM node:14 as builder
RUN mkdir /usr/src/app
RUN mkdir /usr/src/app/public
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:${PATH}
COPY package.json /usr/src/app/package.json
COPY yarn.lock /usr/src/app/yarn.lock
COPY . /usr/src/app
COPY .env /usr/src/app/.env
COPY public /usr/src/app/public  
RUN yarn install
RUN yarn run build

FROM nginx:1.13.9-alpine
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx
COPY --from=builder /usr/src/app/public /usr/share/nginx/html/public
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]
