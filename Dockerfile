FROM node:20.3-slim
WORKDIR /app
COPY . .
RUN npm ci
RUN npm install serve@14.2.0
RUN npm run build
ENV NODE_ENV production
EXPOSE 3000
CMD [ "npx", "serve", "build" ]