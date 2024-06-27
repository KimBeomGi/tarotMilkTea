FROM node:20.12.2

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

COPY public .

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "build"]
