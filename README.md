# Setup

## Requirements
- Docker
- Node

## Steps

- Clone
- Install dependencies
```
npm install
```
- Docker up
```
docker-compose up
```
- Run migration and seed
```
npm run migrate:up
node run /migrations/seed.js
```
- Start
```
npm start
```
