const express = require('express');
const pool = require('../db'); // Assuming the 'db.js' file is in the 
const { updateEnvUrl } = require('../middleware/file_upload');
const router = express.Router();



// Barcha tokenlarni olish
router.get('/tokensklad', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM tokensklad');
      const tokens = result.rows;

      res.json(tokens);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message});
    }
  });
  
  // Yangi token yaratish
  router.post('/tokensklad', async (req, res) => {
    const { token } = req.body;
   
    try {
      const result = await pool.query('INSERT INTO tokensklad (token) VALUES ($1) RETURNING *', [token]);
      const newToken = result.rows[0];
     
      res.status(201).json(newToken); 
      updateEnvUrl()
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message});
    }
  });
  
  // Tokenni yangilash
  router.put('/tokensklad/:id', async (req, res) => {
    const { id } = req.params;
    const { token } = req.body;
    try {
      const result = await pool.query('UPDATE tokensklad SET token = $1, time_update = current_timestamp WHERE id = $2 RETURNING *', [token, id]);
      const updatedToken = result.rows[0];
      res.json(updatedToken);
       updateEnvUrl()
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message});
    }
  });
  
  // Tokenni o'chirish
  router.delete('/tokensklad/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await pool.query('DELETE FROM tokensklad WHERE id = $1', [id]);
    updateEnvUrl()
      res.sendStatus(204);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message});
    }
  });
  


module.exports = router;