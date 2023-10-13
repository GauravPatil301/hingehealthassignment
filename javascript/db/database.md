## Database Schema
```sql
CREATE TABLE TreeNodes (
    id SERIAL PRIMARY KEY,
    label VARCHAR(255) NOT NULL,
    parent_id INTEGER,
    FOREIGN KEY (parent_id) REFERENCES TreeNodes(id)
);

```

## Sample Code
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