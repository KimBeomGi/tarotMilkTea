FROM node:20.12.2

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

COPY public .

EXPOSE 3000

CMD ["npm", "start"]
