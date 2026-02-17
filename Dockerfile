FROM node:22
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json .
RUN npm clean-install

# Copy the source code
COPY . .

# Start Application
CMD ["npm", "run", "start:prod"]
