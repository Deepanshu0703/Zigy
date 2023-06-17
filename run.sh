#!/bin/bash

# Start Express server
cd backend
npm install
node index.js &
cd ..

# Start React app
cd checklists
npm install
npm start
cd ..
