FROM node:16

WORKDIR /usr/src/app

ENV NODE_ENV=development

COPY package*.json ./
COPY prisma ./prisma/
COPY .env ./
COPY tsconfig.json ./
COPY . .

RUN npm ci
RUN npm install typescript -g
RUN npm install tsc-alias -g

RUN npx prisma generate

EXPOSE 3000

RUN npm run build

CMD npx prisma migrate deploy && npm run prod