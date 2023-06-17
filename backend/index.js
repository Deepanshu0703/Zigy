const express = require('express');
const cors = require('cors');
const data = require('./data.js');

const app = express();
app.use(cors());
app.use(express.json());

let selectedItems = [];

app.get('/selectedItems', (req, res) => {
  res.json(selectedItems);
});

app.get('/items', (req, res) => {
  res.json(data);
});
  
app.post('/selectedItems', (req, res) => {
  const newItems = req.body;
  selectedItems = [...selectedItems, ...newItems];
  res.sendStatus(200);
});

app.put('/selectedItems', (req, res) => {
  const updatedItems = req.body;
  selectedItems = updatedItems;
  res.sendStatus(200);
});

app.put('/selectedItems/:id', (req, res) => {
  const itemId = req.params.id;
  selectedItems = selectedItems.filter((item) => item.id !== itemId);
  res.sendStatus(200);
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
