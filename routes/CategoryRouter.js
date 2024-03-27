const express = require('express');
const pool = require('../db'); // Assuming the 'db.js' file is in the same directory
const { upload_file, delete_file, put_file } = require('../middleware/file_upload');
const router = express.Router();

// Create a new category
router.post('/api/v1/category', async (req, res) => {
  try {
    const { category_id, category_title,  subcategory } = req.body;
    var image=upload_file(req)
    const query = 'INSERT INTO category (category_id, category_title, image, subcategory) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [category_id, category_title, image, subcategory];
    const newCategory = await pool.query(query, values);
    res.json(newCategory.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Retrieve all categories
router.get('/api/v1/category', async (req, res) => {
  try {
    const query = 'SELECT * FROM category';
    const allCategories = await pool.query(query);
    res.json(allCategories.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Retrieve a specific category by ID
router.get('/api/v1/category/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const query = 'SELECT * FROM category WHERE id = $1';
    const category = await pool.query(query, [id]);
    res.json(category.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a category
router.put('/api/v1/category/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const query1 = 'SELECT * FROM category WHERE id = $1';
    const category = await pool.query(query1, [id]);
    if(category.rows[0]){
     var image=put_file((category.rows[0]).image,req)
    }
    const { category_id, category_title,  subcategory } = req.body;
    const query = 'UPDATE category SET category_id = $1, category_title = $2, image = $3, subcategory = $4 WHERE id = $5 RETURNING *';
    const values = [category_id, category_title, image, subcategory, id];
    const updatedCategory = await pool.query(query, values);
    res.json(updatedCategory.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a category
router.delete('/api/v1/category/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const query1 = 'SELECT * FROM category WHERE id = $1';
    const category = await pool.query(query1, [id]);
    if(category.rows[0]){
     delete_file((category.rows[0]).image)
    }
    
    const query = 'DELETE FROM category WHERE id = $1 RETURNING *';
    const deletedCategory = await pool.query(query, [id]);
    res.json(deletedCategory.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;