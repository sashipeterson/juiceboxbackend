# Block 34 - Juicebox

## Introduction

In this assessment, you'll be provided this GitHub repo with details for a full operational CRUD API that uses Express.JS, PostgreSQL, and other technologies that you've been trained on. 

Notes

Link to Front End
https://github.com/sashipeterson/Unit4JuiceBoxFrontEnd

Includes .env file which has
JWT_SECRET=randomsecurevalue88
CORS_ORIGIN=http://localhost:5173

Run from the front end this will activate the front end (http://localhost:5173) and back end (http://localhost:4000) servers simultaneously.

This is done using concurrently install with npm install concurrently.

Run using npm run start:dev

Note Dependencies

{
  "name": "juiceboxfrontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "start:dev": "concurrently \"npm run dev\" \"npm run start:dev --prefix ../Unit4.Juicebox.Starter\"",
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.55",
    "@types/react-dom": "^18.2.19",
    "@vitejs/plugin-react": "^4.2.1",
    "concurrently": "^8.2.2",
    "eslint": "^8.56.0",
    "eslint-plugin-react": "^7.33.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.5",
    "vite": "^5.1.0"
  }
}


BACK END
Install dotenv, cors, and bcrypt
npm install dotenv
ipm install cors
npm install bcrypt

Note Dependencies

{
  "name": "juicebox",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "seed:dev": "nodemon ./db/seed.js",
    "seed": "node ./db/seed.js",
    "start": "node index.js",
    "start:dev": "nodemon index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "devDependencies": {
    "nodemon": "^2.0.3"
  },
  "dependencies": {
    "bcrypt": "^5.1.1",
    "cors": "^2.8.5",
    "dotenv": "^8.6.0",
    "express": "^4.17.1",
    "jsonwebtoken": "^8.5.1",
    "morgan": "^1.10.0",
    "pg": "^8.0.3"
  }
}