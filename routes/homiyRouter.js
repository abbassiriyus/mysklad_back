const express = require('express');
const pool = require('../db'); // Assuming the 'db.js' file is in the same directory
const { upload_file, delete_file, put_file } = require('../middleware/file_upload');
const validateJWT = require('../middleware/middleware');
const { default: axios } = require('axios');
const router = express.Router();

// Create a new homiy
router.post('/homiy', async (req, res) => {
  try {
    var image=upload_file(req)
    const query = 'INSERT INTO homiy (image) VALUES ($1) RETURNING *';
    const values = [image];
    const newhomiy = await pool.query(query, values);
    res.json(newhomiy.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Retrieve all categories
router.get('/homiy', async (req, res) => {
  try {
    const query = 'SELECT * FROM homiy';
    const allCategories = await pool.query(query);
    res.json(allCategories.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Retrieve a specific homiy by ID
router.get('/homiy/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const query = 'SELECT * FROM homiy WHERE id = $1';
    const homiy = await pool.query(query, [id]);
    res.json(homiy.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a homiy
router.put('/homiy/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const query1 = 'SELECT * FROM homiy WHERE id = $1';
    const homiy = await pool.query(query1, [id]);
    if(homiy.rows[0]){
     var image=put_file((homiy.rows[0]).image,req)
    }
   
    const query = 'UPDATE homiy SET image = $1 WHERE id = $2 RETURNING *';
    const values = [ image, id];
    const updatedhomiy = await pool.query(query, values);
    res.json(updatedhomiy.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a homiy
router.delete('/homiy/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const query1 = 'SELECT * FROM homiy WHERE id = $1';
    const homiy = await pool.query(query1, [id]);
    if(homiy.rows[0]){
     delete_file((homiy.rows[0]).image)
    }
    
    const query = 'DELETE FROM homiy WHERE id = $1 RETURNING *';
    const deletedhomiy = await pool.query(query, [id]);
    res.json(deletedhomiy.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;