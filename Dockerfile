FROM node:10.17.0

WORKDIR /home/codebase
COPY package.json package-lock.json* ./
# RUN npm install && npm cache clean
RUN npm install
COPY . .
EXPOSE 3333
CMD [ "node", "app.js" ]
