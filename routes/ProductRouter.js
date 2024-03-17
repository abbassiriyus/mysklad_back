require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');

async function getAllProducts() {
  try {
    const response = await axios.get('https://api.mysklad.com/api/rest/v1/entity/product', {
      headers: {
        'Authorization': `Bearer ${process.env.CODE_BASE}`, // YOUR_ACCESS_TOKEN ni o'zgartiring
        'Accept-Encoding':'gzip'
      }
    });

    return response.data.rows;
  } catch (error) {
    console.error('Xatolik yuz berdi:', error);
    throw error;
  }
}

  router.get('/product',(res,req)=>{
getAllProducts()
  .then(products => {
    console.log('Hamma maxsulotlar:',products.rows);
    req.status(products)
  })
  .catch(error => {
    console.error('Xatolik:', error.message);
  });

  })
  module.exports=router