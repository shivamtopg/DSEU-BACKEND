# Set Base-Image
FROM node:18-slim 

# Set working directory inside the container 
WORKDIR /app 

# Copy only package.json and package-lock.json for better caching 
COPY package*.json ./ 

# Install dependencies 
RUN npm install 

# Copy the entire backend code 
COPY . . 

# Expose backend port 
EXPOSE 5000 

# Start backend server 
CMD ["npm", "run", "dev"]
