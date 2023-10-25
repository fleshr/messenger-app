FROM node:18-alpine
WORKDIR /server
COPY . .
RUN npm ci
RUN npm run build
CMD ["npm", "start"]
EXPOSE 4000
