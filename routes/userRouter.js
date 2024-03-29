const express = require('express');
const router = express.Router();
const db = require('../db');
const jwt = require('jsonwebtoken');

// Login
router.post('/login', async (req, res) => {
    console.log(req.body);
    const { login, password } = req.body;
    
    try {
      const query = 'SELECT * FROM users WHERE login = $1 AND password = $2';
      const values = [login, password];
      const result = await db.query(query, values);
      if (result.rowCount === 1) {
        const user = result.rows[0];
        const token = jwt.sign({ userId: user.id }, 'your_secret_key');
        res.json({ token });
      } else {
        res.status(401).json({ message: 'Invalid login credentials' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message:error.message });
    }
  });
// Add a new user
router.post('/users', async (req, res) => {
  const { login, password } = req.body;

  try {
    const query =
      'INSERT INTO users (login, password) VALUES ($1, $2) RETURNING *';
    const values = [login, password];
    const result = await db.query(query, values);

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'An error occurred while creating user' });
  }
});

// Update a user
router.put('/users/:id', async (req, res) => {
  const id = req.params.id;
  const { login, password } = req.body;

  try {
    const query =
      'UPDATE users SET login = $1, password = $2, time_update = current_timestamp WHERE id = $3 RETURNING *';
    const values = [login, password, id];
    const result = await db.query(query, values);

    if (result.rowCount === 0) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'An error occurred while updating user' });
  }
});

// Delete a user
router.delete('/users/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const query = 'DELETE FROM users WHERE id = $1';
    const values = [id];
    await db.query(query, values);

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'An error occurred while deleting user' });
  }
});

module.exports = router;