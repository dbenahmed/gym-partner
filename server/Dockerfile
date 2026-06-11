FROM node:20-alpine
WORKDIR /app

# Native Docker environment variable
ENV NODE_ENV=development

COPY package*.json ./
RUN npm i

COPY . .
EXPOSE 3232

# Chaining Drizzle push and Nodemon execution
CMD ["sh", "-c", "npx drizzle-kit push && npx nodemon app.ts --local"]