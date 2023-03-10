FROM node:16.19.0-alpine

RUN apk add --update --no-cache tzdata

# EXPORT ENVs
ENV TZ America/Sao_Paulo

WORKDIR /app

COPY package.json package-lock.json tsconfig.json babel.config.js swagger-doc.json .env ./
COPY src src

RUN npm ci
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/index.js"]