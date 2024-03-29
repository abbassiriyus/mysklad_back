const express = require('express');
const pool = require('../db'); // Assuming the 'db.js' file is in the 
const router = express.Router();


// Yeni bir üst tovar oluşturma
router.post('/best_seller', async (req, res) => {
    try {
      const { category_id } = req.body;
  
      const query =
        'INSERT INTO best_seller (category_id) VALUES ($1) RETURNING *';
  
      const result = await pool.query(query, [category_id]);
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error creating top tovar:', error);
      res.status(500).json({ error: error.message });
    }
  });
  
  // Tüm üst tovarları getirme
  router.get('/best_seller', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM best_seller');
      res.json(result.rows);
    } catch (error) {
      console.error('Error retrieving top tovarlar:', error);
      res.status(500).json({ error: error.message });
    }
  });
  
  // Belirli bir üst tovarı getirme
  router.get('/best_seller/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const query = 'SELECT * FROM best_seller WHERE id = $1';
      const result = await pool.query(query, [id]);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Top tovar not found' });
      }
  
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error retrieving top tovar:', error);
      res.status(500).json({ error: error.message });
    }
  });
  
  // Bir üst tovarı güncelleme
  router.put('/best_seller/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { category_id } = req.body;
  
      const query =
        'UPDATE best_seller SET category_id = $1, time_update = current_timestamp WHERE id = $2 RETURNING *';
  
      const result = await pool.query(query, [category_id, id]);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Top tovar not found' });
      }
  
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error updating top tovar:', error);
      res.status(500).json({ error: error.message });
    }
  });
  
  // Bir üst tovarı silme
  router.delete('/best_seller/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const query = 'DELETE FROM best_seller WHERE id = $1 RETURNING *';
      const result = await pool.query(query, [id]);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Top tovar not found' });
      }
  
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error deleting top tovar:', error);
      res.status(500).json({ error: error.message });
    }
  });



module.exports = router;