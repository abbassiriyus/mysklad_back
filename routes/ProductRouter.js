require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');

async function getAllProducts(id) {
  try {
    const response = await axios.get(`https://api.moysklad.ru/api/remap/1.2/entity/product?expand=images&limit=${id}`, {
      headers: {
        "Accept":'*/*',
        "User-Agent":'Thunder Client (https://www.thunderclient.com)',
        'Authorization':`Basic ${process.env.CODE_BASE}`,
        'Accept-Encoding':'gzip',
      }
    });
    return response.data.rows;
  } catch (error) {
    req.status(404).send(error.message)
  }
}

  router.get('/product',(req,res)=>{
    var { limit } = req.query; 
    if(!limit){
      limit=10
    }
getAllProducts(limit)
  .then(products => {
    res.status(200).send(products)

  })
  .catch(error => {
    res.status(404).send(error.message)
  });

  })

  async function getCategoryProducts(id,limit) {
    try {
      console.log(id);
      console.log(limit);
      const response = await axios.get(`https://api.moysklad.ru/api/remap/1.2/entity/assortment?filter=productFolder=https://api.moysklad.ru/api/remap/1.2/entity/productfolder/${id}&expand=images&limit=${limit}`, {
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
    }
  }
  

router.get('/category/product/:id',async (req,res)=>{
  try{
    console.log(req.query , req.params);
var data=await getCategoryProducts(req.params.id,req.query.limit)

res.status(200).send(data)
  }catch(err){
    res.status(400).send(error.message)
  }

})

  module.exports=router