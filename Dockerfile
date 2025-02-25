# Use a Debian-based Node.js image
FROM node:20-bookworm

# Install Linux packaging tools and Electron dependencies
RUN apt-get update && apt-get install -y \
    dpkg \
    fakeroot \
    rpm \
    libgtk-3-0 \
    libnotify4 \
    libnss3 \
    libxss1 \
    libxtst6 \
    xdg-utils

# Set the working directory inside the container
WORKDIR /app

# Copy package files first (for dependency caching)
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy the entire project into the container
COPY . .

# Build the app for Linux
CMD ["npm", "run", "make", "--", "--platform=linux"]