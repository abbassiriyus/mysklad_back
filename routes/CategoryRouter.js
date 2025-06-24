const express = require('express');
const pool = require('../db'); // Assuming the 'db.js' file is in the same directory
const { upload_file, delete_file, put_file } = require('../middleware/file_upload');
const validateJWT = require('../middleware/middleware');
const { default: axios } = require('axios');
const router = express.Router();

// Create a new category
router.post('/api/category',  async (req, res) => {
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
router.get('/api/category', async (req, res) => {
  try {
    const query = 'SELECT * FROM category';
    const allCategories = await pool.query(query);
   
    res.json(allCategories.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

async function getAllCategory() {
  try {
    const response = await axios.get(`https://api.moysklad.ru/api/remap/1.2/entity/productfolder`, {
      headers: {
        "Accept":'*/*',
        "User-Agent":'Thunder Client (https://www.thunderclient.com)',
        'Authorization':`Basic ${process.env.CODE_BASE}`,
        'Accept-Encoding':'gzip',
      }
    });
     console.log(response);
    return response.data.rows;
   
  } catch (error) {
    console.log(error.message);
  }
}

// Retrieve all categories
router.get('/api/category/all', async (req, res) => {
  try {
    const allCategories = await getAllCategory() 
    res.json(allCategories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Retrieve a specific category by ID
router.get('/api/category/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const query = 'SELECT * FROM category WHERE id = $1';
    const category = await pool.query(query, [id]);
    res.json(category.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Retrieve all categories

// Update a category
router.put('/api/category/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const query1 = 'SELECT * FROM category WHERE id = $1';
    const category = await pool.query(query1, [id]);
    if(category.rows[0]){
     var image=put_file((category.rows[0]).image,req)
    }
    const { category_id, category_title,  subcategory } = req.body;
    if((req.body && req.body.image ) || (req.file && req.file.image )) {
    const query = 'UPDATE category SET category_id = $1, category_title = $2, image = $3, subcategory = $4 WHERE id = $5 RETURNING *';
    const values = [category_id, category_title, image, subcategory, id];
    const updatedCategory = await pool.query(query, values);
    res.json(updatedCategory.rows[0]);
    }else{
      const query = 'UPDATE category SET category_id = $1, category_title = $2, subcategory = $3 WHERE id = $4 RETURNING *';
      const values = [category_id, category_title, subcategory, id];
      const updatedCategory = await pool.query(query, values);
      res.json(updatedCategory.rows[0]);
    }



  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a category
router.delete('/api/category/:id', async (req, res) => {
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