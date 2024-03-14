# Setup

## Requirements
- Docker
- Node

## Steps

- Clone
- Install dependencies
```bash
npm install
```
- Docker up
```bash
docker-compose up
```
- Run migration and seed
```bash
npm run migrate:up
node run /migrations/seed.js
```
- Start
```bash
npm start
```
