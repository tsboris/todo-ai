FROM node:14

WORKDIR /usr/src/app

# Copy package.json
COPY package.json ./

# Install dependencies
RUN npm install

# Copy all files from the current directory to the container
COPY . .

EXPOSE 5050

CMD ["npm", "start"]