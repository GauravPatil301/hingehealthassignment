/* npm install jest supertest @jest/globals --save-dev */
/* npx jest */

const request = require('supertest');
const app = require('./index'); // Assuming your index code is in index.js

// Tests for GET /api/tree
describe('GET /api/tree', () => {
  it('should return the animal tree', async () => {
    const response = await request(app).get('/api/tree');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });
});

// Tests for POST /api/tree
describe('POST /api/tree', () => {
  it('should add a new node and return a new ID', async () => {
    const payload = {
      parent: '3',
      label: 'panda',
    };

    const response = await request(app)
      .post('/api/tree')
      .send(payload);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Node added successfully');
    expect(response.body.newId).toBeDefined();
  });

  it('should return an error for invalid parent ID', async () => {
    const invalidPayload = {
      parent: '999', // Invalid parent ID
      label: 'panda',
    };

    const response = await request(app)
      .post('/api/tree')
      .send(invalidPayload);

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Parent node not found.');
  });
});
