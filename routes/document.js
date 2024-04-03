const express = require('express');
const pool = require('../db'); // Assuming the 'db.js' file is in the same directory
const { upload_file, delete_file, put_file } = require('../middleware/file_upload');
const validateJWT = require('../middleware/middleware');
const { default: axios } = require('axios');
const router = express.Router();

// Create a new document
router.post('/api/document', async (req, res) => {
  try {
    var image=upload_file(req)
    const query = 'INSERT INTO document (image) VALUES ($1) RETURNING *';
    const values = [image];
    const newdocument = await pool.query(query, values);
    res.json(newdocument.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Retrieve all categories
router.get('/api/document', async (req, res) => {
  try {
    const query = 'SELECT * FROM document';
    const allCategories = await pool.query(query);
    res.json(allCategories.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Retrieve a specific document by ID
router.get('/api/document/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const query = 'SELECT * FROM document WHERE id = $1';
    const document = await pool.query(query, [id]);
    res.json(document.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a document
router.put('/api/document/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const query1 = 'SELECT * FROM document WHERE id = $1';
    const document = await pool.query(query1, [id]);
    if(document.rows[0]){
     var image=put_file((document.rows[0]).image,req)
    }
   
    const query = 'UPDATE document SET image = $1 WHERE id = $2 RETURNING *';
    const values = [ image, id];
    const updateddocument = await pool.query(query, values);
    res.json(updateddocument.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a document
router.delete('/api/document/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const query1 = 'SELECT * FROM document WHERE id = $1';
    const document = await pool.query(query1, [id]);
    if(document.rows[0]){
     delete_file((document.rows[0]).image)
    }
    const query = 'DELETE FROM document WHERE id = $1 RETURNING *';
    const deleteddocument = await pool.query(query, [id]);
    res.json(deleteddocument.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;