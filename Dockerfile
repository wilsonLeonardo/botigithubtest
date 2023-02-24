FROM node:16.19.0-alpine

RUN apk add --update --no-cache tzdata

# EXPORT ENVs
ENV TZ America/Sao_Paulo

WORKDIR /app

COPY . .

RUN npm ci
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/index.js"]