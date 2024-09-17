FROM node:20-alpine3.20

# Create app directory

WORKDIR /usr/src/app

# Install app dependencies

COPY package*.json ./

RUN npm ci --omit=dev

# Bundle app source

COPY . .

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ENV PORT=8080

EXPOSE 8080

CMD [ "node", "index.js" ]
