const express = require('express');
const pool = require('../db'); // Assuming the 'db.js' file is in the 
const router = express.Router();


// Yeni bir üst tovar oluşturma
router.post('/top_tovar', async (req, res) => {
  try {
    const { category_id } = req.body;

    // Jadvalda mavjud bo'lgan elementni olish
    const existingResult = await pool.query('SELECT * FROM top_tovar');

    if (existingResult.rows.length > 0) {
      // Agar mavjud bo'lsa, yangilash
      const query = 'UPDATE top_tovar SET category_id = $1 RETURNING *';
      const result = await pool.query(query, [category_id]);
      res.json(result.rows[0]);
    } else {
      // Agar mavjud bo'lmasa, yangi qo'shish
      const query = 'INSERT INTO top_tovar (category_id) VALUES ($1) RETURNING *';
      const result = await pool.query(query, [category_id]);
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error('Error creating top tovar:', error);
    res.status(500).json({ error: error.message });
  }
});
  
  // Tüm üst tovarları getirme
  router.get('/top_tovar', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM top_tovar ORDER BY id DESC');
      res.json(result.rows);
    } catch (error) {
      console.error('Error retrieving top tovarlar:', error);
      res.status(500).json({ error: error.message });
    }
  });
  
  // Belirli bir üst tovarı getirme
  router.get('/top_tovar/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const query = 'SELECT * FROM top_tovar WHERE id = $1';
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
  router.put('/top_tovar/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { category_id } = req.body;
  
      const query =
        'UPDATE top_tovar SET category_id = $1, time_update = current_timestamp WHERE id = $2 RETURNING *';
  
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
  router.delete('/top_tovar/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const query = 'DELETE FROM top_tovar WHERE id = $1 RETURNING *';
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