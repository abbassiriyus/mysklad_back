const express = require('express');
const pool = require('../db'); // Assuming the 'db.js' file is in the 
const router = express.Router();



// Barcha tokenlarni olish
router.get('/tokensklad', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM tokensklad');
      const tokens = result.rows;
      client.release();
      res.json(tokens);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Yangi token yaratish
  router.post('/tokensklad', async (req, res) => {
    const { token } = req.body;
    try {
      const client = await pool.connect();
      const result = await client.query('INSERT INTO tokensklad (token) VALUES ($1) RETURNING *', [token]);
      const newToken = result.rows[0];
      client.release();
      res.status(201).json(newToken);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Tokenni yangilash
  router.put('/tokensklad/:id', async (req, res) => {
    const { id } = req.params;
    const { token } = req.body;
    try {
      const client = await pool.connect();
      const result = await client.query('UPDATE tokensklad SET token = $1, time_update = current_timestamp WHERE id = $2 RETURNING *', [token, id]);
      const updatedToken = result.rows[0];
      client.release();
      res.json(updatedToken);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Tokenni o'chirish
  router.delete('/tokensklad/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const client = await pool.connect();
      await client.query('DELETE FROM tokensklad WHERE id = $1', [id]);
      client.release();
      res.sendStatus(204);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  


module.exports = router;