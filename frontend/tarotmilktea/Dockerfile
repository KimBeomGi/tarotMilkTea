FROM node:20.12.2

WORKDIR /app
COPY . .

COPY .env /app/.env

RUN npm install
CMD ["npm", "run", "build"]