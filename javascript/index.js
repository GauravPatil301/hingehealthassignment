const express = require('express');

const app = express();

const fs = require('fs');

let nextId = 8; // Starting with the next available ID after the initial animalTree IDs

const rawData = fs.readFileSync('data.json');
const animalTree = JSON.parse(rawData);

app.use(express.json());

app.get('/api/tree', (req, res) => {
  res.json([animalTree]);
});

app.post('/api/tree', (req, res) => {
  const { parent, label } = req.body;

  // Find the parent node
  const parentNode = animalTree[parent];
  if (!parentNode) {
    res.status(404).json({ error: 'Parent node not found.' });
    return;
  }

  // Generate a new unique ID
  nextId += 1;
  const newId = nextId;
  const newNode = {
    [newId]: {
      label,
      children: [],
    },
  };

  // Add the new node to the parent's children
  parentNode.children.push(newNode);

  res.json({ message: 'Node added successfully.', newId });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
