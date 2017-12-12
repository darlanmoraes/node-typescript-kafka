FROM node:8.4.0

WORKDIR /app

COPY package.json package.json
RUN npm install

COPY src src
COPY tsconfig.json tsconfig.json
RUN npm run-script build

CMD [ "node", "dist" ]
