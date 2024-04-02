const express = require('express');
const pool = require('../db'); // Assuming the 'db.js' file is in the 
const router = express.Router();



// Barcha dollorlarni olish
router.get('/dolor_course', async (req, res) => {
    try {

      const result = await pool.query('SELECT * FROM dolor_course');
      const dollors = result.rows;
      res.json(dollors);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  });
  
  // Yangi dollor yaratish
  router.post('/dolor_course', async (req, res) => {
    const { dollor } = req.body;
    try {

      const result = await pool.query('INSERT INTO dolor_course (dollor) VALUES ($1) RETURNING *', [dollor]);
      const newdollor = result.rows[0];
      res.status(201).json(newdollor);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  });
  
  // dollorni yangilash
  router.put('/dolor_course/:id', async (req, res) => {
    const { id } = req.params;
    const { dollor } = req.body;
    try {

      const result = await pool.query('UPDATE dolor_course SET dollor = $1, time_update = current_timestamp WHERE id = $2 RETURNING *', [dollor, id]);
      const updateddollor = result.rows[0];
      res.json(updateddollor);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  });
  
  // dollorni o'chirish
  router.delete('/dolor_course/:id', async (req, res) => {
    const { id } = req.params;
    try {

      await pool.query('DELETE FROM dolor_course WHERE id = $1', [id]);
      res.sendStatus(204);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  });
  


module.exports = router;