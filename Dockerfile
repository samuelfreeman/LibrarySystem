# Dockerfile

FROM node:20-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install

COPY prisma ./prisma

RUN pnpm prisma generate


COPY . .

RUN pnpm run build

EXPOSE 3000

CMD ["sh", "-c", "npx prisma generate && node dist/index.js"]
