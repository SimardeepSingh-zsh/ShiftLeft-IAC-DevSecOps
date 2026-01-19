FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
RUN npm run lint && npm test

FROM gcr.io/distroless/nodejs20
WORKDIR /app
COPY --from=build /app /app
ENV PORT=3000
EXPOSE 3000
CMD ["src/index.js"]