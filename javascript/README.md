# Javascript

# 1. Project Setup 
```
clone this repository and run npm install
```
  ## Compiles and start the server at port 5000 by default
  
```
 npm run start
 ```
   ## Run the Test
 ```
 npx jest
 ```
   ## Lint and Fixes Files 
 ```
 npm run lint
 ```

# API Details and Challenge Tasks

## 1. GET /api/tree return the entire tree - in the following format;

```
app.get('/api/tree', (req, res) => {
  res.json([animalTree]);
});
```

## 2. POST /api/tree/ with the payload of the format

```
app.post('/api/tree', (req, res) => {
  const { parent, label } = req.body;

  // Find the parent node
  const parentNode = animalTree[parent];
  if (!parentNode) {
    res.status(404).json({ error: 'Parent node not found.' });
    return;
  }

  // Generate a new unique ID
  const newId = nextId++;
  const newNode = {
    [newId]: {
      label,
      children: []
    }
  };

  // Add the new node to the parent's children
  parentNode.children.push(newNode);

  res.json({ message: 'Node added successfully.', newId });
});
```

# Database task 3 and 4

### Database Schema
``` sql
CREATE TABLE TreeNodes (
    id SERIAL PRIMARY KEY,
    label VARCHAR(255) NOT NULL,
    parent_id INTEGER,
    FOREIGN KEY (parent_id) REFERENCES TreeNodes(id)
);

  ```

### Sample Code

```
const { Client } = require('pg');

const client = new Client({
  user: 'your_username',
  host: 'your_host',
  database: 'your_database',
  password: 'your_password',
  port: 5432,
});

async function addTreeNode(parent_id, label) {
  try {
    await client.connect();

    const result = await client.query('SELECT AddTreeNode($1, $2) AS new_id', [parent_id, label]);

    return result.rows[0].new_id;
  } finally {
    await client.end();
  }
}

// Usage example to add a new node
addTreeNode(3, 'panda')
  .then(newId => console.log('New node added with ID:', newId))
  .catch(err => console.error('Error adding node:', err));

  ```
