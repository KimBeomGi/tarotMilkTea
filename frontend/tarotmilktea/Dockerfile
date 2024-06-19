# FROM node:20.12.2

# WORKDIR /app
# COPY . .

# COPY .env .env

# RUN npm install
# CMD ["npm", "run", "build"]



# # Start your image with a node base image
# FROM node:20.12.2

# # The /app directory should act as the main application directory
# WORKDIR /app

# # Copy the app package and package-lock.json file
# COPY package.json package.json
# COPY package-lock.json package-lock.json

# COPY .env .env

# # Install node packages, install serve, build the app, and remove dependencies at the end
# RUN npm install \
#     && npm install -g serve \
#     && npm run build \
#     && rm -fr node_modules

# EXPOSE 3000

# # Start the app using serve command
# CMD [ "serve", "-s", "build" ]

FROM node:20.12.2

# set work directory
WORKDIR /usr/src/app

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install -g serve
RUN npm install

# copy react project
COPY . .

# build react project
RUN npm run build