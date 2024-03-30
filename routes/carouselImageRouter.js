const express = require('express');
const pool = require('../db'); // Assuming the 'db.js' file is in the same directory
const { upload_file, delete_file, put_file } = require('../middleware/file_upload');
const validateJWT = require('../middleware/middleware');
const { default: axios } = require('axios');
const router = express.Router();

// Create a new carousel
router.post('/api/carousel', async (req, res) => {
  try {
    var image=upload_file(req)
    const query = 'INSERT INTO carousel (image) VALUES ($1) RETURNING *';
    const values = [image];
    const newcarousel = await pool.query(query, values);
    res.json(newcarousel.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Retrieve all categories
router.get('/api/carousel', async (req, res) => {
  try {
    const query = 'SELECT * FROM carousel';
    const allCategories = await pool.query(query);
    res.json(allCategories.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Retrieve a specific carousel by ID
router.get('/api/carousel/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const query = 'SELECT * FROM carousel WHERE id = $1';
    const carousel = await pool.query(query, [id]);
    res.json(carousel.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a carousel
router.put('/api/carousel/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const query1 = 'SELECT * FROM carousel WHERE id = $1';
    const carousel = await pool.query(query1, [id]);
    if(carousel.rows[0]){
     var image=put_file((carousel.rows[0]).image,req)
    }
   
    const query = 'UPDATE carousel SET image = $1 WHERE id = $2 RETURNING *';
    const values = [ image, id];
    const updatedcarousel = await pool.query(query, values);
    res.json(updatedcarousel.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a carousel
router.delete('/api/carousel/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const query1 = 'SELECT * FROM carousel WHERE id = $1';
    const carousel = await pool.query(query1, [id]);
    if(carousel.rows[0]){
     delete_file((carousel.rows[0]).image)
    }
    
    const query = 'DELETE FROM carousel WHERE id = $1 RETURNING *';
    const deletedcarousel = await pool.query(query, [id]);
    res.json(deletedcarousel.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;