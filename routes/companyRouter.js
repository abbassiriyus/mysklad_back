const express = require('express');
const router = express.Router();
const pool=require("../db")
const { upload_file, put_file } = require('../middleware/file_upload');



// Yeni bir şirket oluşturma
router.post('/company', async (req, res) => {
  try {
    const {
      phone,
      email,
      address,
      facebook,
      lan,
      lac,
      telegram,
      youtobe,
      instagram,
    
    } = req.body;
var image=upload_file(req)


console.log("=================>");
console.log(req);
console.log("=================>");

    // const query =
    //   'INSERT INTO company (phone, email, address, facebook, lan, lac, telegram, youtobe, instagram, image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *';

    // const values = [
    //   phone,
    //   email,
    //   address,
    //   facebook,
    //   lan,
    //   lac,
    //   telegram,
    //   youtobe,
    //   instagram,
    //   image,
    // ];

    // const result = await pool.query(query, values);
    // res.json(result.rows[0]);
    res.status(200).send("da")
  } catch (error) {
    console.error('Error creating company:', error);
    res.status(500).json({ error: error.message });
  }
});

// Tüm şirketleri getirme
router.get('/company', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM company');
    res.json(result.rows);
  } catch (error) {
    console.error('Error retrieving companies:', error);
    res.status(500).json({ error: error.message });
  }
});

// Belirli bir şirketi getirme
router.get('/company/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const query = 'SELECT * FROM company WHERE id = $1';
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Company not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error retrieving company:', error);
    res.status(500).json({ error: error.message });
  }
});

// Bir şirketi güncelleme
router.put('/company/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      phone,
      email,
      address,
      facebook,
      lan,
      lac,
      telegram,
      youtobe,
      instagram,
    } = req.body;

    const query1= 'SELECT * FROM company WHERE id = $1';
    const result1 = await pool.query(query1, [id]);
if(result1.rows.length>0){
var image=put_file(result1.rows[0].image,req)
}else{
var image="no image"
}
    const query =
      'UPDATE company SET phone = $1, email = $2, address = $3, facebook = $4, lan = $5, lac = $6, telegram = $7, youtobe = $8, instagram = $9, image = $10, time_update = current_timestamp WHERE id = $11 RETURNING *';

    const values = [
      phone,
      email,
      address,
      facebook,
      lan,
      lac,
      telegram,
      youtobe,
      instagram,
      image,
      id,
    ];

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Company not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating company:', error);
    res.status(500).json({ error: error.message });
  }
});

// Bir şirketi silme
router.delete('/company/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const query = 'DELETE FROM company WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Company not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error deleting company:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;