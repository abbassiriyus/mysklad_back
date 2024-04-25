const express = require('express');
const pool = require('../db'); // Assuming the 'db.js' file is in the same directory
const router = express.Router();

// Yaratish
router.post('/header_category', async (req, res) => {
    try {
      const { category_id } = req.body;
      const query = 'INSERT INTO header_category (category_id) VALUES ($1) RETURNING *';
      const values = [category_id];
      const result = await pool.query(query, values);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // O'qish
  router.get('/header_category', async (req, res) => {
    try {
      const query = 'SELECT * FROM header_category ';
      const result = await pool.query(query);
      const query1 = 'SELECT * FROM category ';
      const result1 = await pool.query(query1);
      for (let i = 0; i < result.rows.length; i++) {
      for (let j = 0; j < result1.rows.length; j++) {
      if(result.rows[i].category_id==result1.rows[j].id){
        result.rows[i].category_title=result1.rows[j].category_title
        result.rows[i].image=result1.rows[j].image
        result.rows[i].category_id1=result1.rows[j].category_id
      }
      }
      }
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Yangilash
  router.put('/header_category/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { category_id } = req.body;
      const query = 'UPDATE header_category SET category_id = $1, time_update = current_timestamp WHERE id = $2 RETURNING *';
      const values = [category_id, id];
      const result = await pool.query(query, values);
      res.json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // O'chirish
  router.delete('/header_category/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const query = 'DELETE FROM header_category WHERE id = $1';
      const values = [id];
      await pool.query(query, values);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

  module.exports = router;