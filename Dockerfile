FROM node:16.20.1-alpine
WORKDIR /app
COPY tsconfig*.json ./
COPY package*.json ./
RUN npm ci
COPY src/ src/
RUN npm run build

FROM node:16.20.1-alpine as production
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=0 /app/dist/ dist/

EXPOSE 3000
CMD [ "node", "dist/main.js" ]