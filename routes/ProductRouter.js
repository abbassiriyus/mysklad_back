require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');
const fs=require('fs')
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

async function getProduct(id) {
  try {
    console.log(id);
    const response = await axios.get(`https://api.moysklad.ru/api/remap/1.2/entity/product/${id}?expand=images`, {
      headers: {
        "Accept":'*/*',
        "User-Agent":'Thunder Client (https://www.thunderclient.com)',
        'Authorization':`Basic ${process.env.CODE_BASE}`,
        'Accept-Encoding':'gzip',
      }
    });
    return response.data;
  } catch (error) {
    // req.status(404).send(error.message)
  }
}
const downloadImage = async (url, path) => {
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream',
    headers: {
      "Accept":'*/*',
      "User-Agent":'Thunder Client (https://www.thunderclient.com)',
      'Authorization':`Basic ${process.env.CODE_BASE}`,
      'Accept-Encoding':'gzip'
    }
  });

  response.data.pipe(fs.createWriteStream(path));

  return new Promise((resolve, reject) => {
    response.data.on('end', () => {
      resolve();
    });

    response.data.on('error', err => {
      reject(err);
    });
  });
};

router.get("/oneproduct/:id", async (req,res)=>{
try{
  var data=await getProduct(req.params.id)
  console.log(data);
  downloadImage(`https://api.moysklad.ru/api/remap/1.2/download/d2c0999f-a801-4e08-99be-228b3d56de07`,"./image")
  res.status(200).send(data)
}catch(err){
  res.status(400).send(err.message)
}
})

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

  async function getCategoryProducts(id,limit,offset) {
    try {
      console.log(offset);
      const response = await axios.get(`https://api.moysklad.ru/api/remap/1.2/entity/assortment?filter=productFolder=https://api.moysklad.ru/api/remap/1.2/entity/productfolder/${id}&expand=images&limit=${limit}&offset=${offset}`, {
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
  
  
  async function getCategoryProducts1(id) {
    try {
      const response = await axios.get(`https://api.moysklad.ru/api/remap/1.2/entity/assortment?filter=productFolder=https://api.moysklad.ru/api/remap/1.2/entity/productfolder/${id}`, {
        headers: {
          "Accept":'*/*',
          "User-Agent":'Thunder Client (https://www.thunderclient.com)',
          'Authorization':`Basic ${process.env.CODE_BASE}`,
          'Accept-Encoding':'gzip',
        }
      });
      return response.data.rows;
    } catch (error) {
    return error.message
    }
  }
  
router.get('/category/count/:id', async (req,res)=>{
  try{
var data=await getCategoryProducts1(req.params.id)
res.status(200).send({count:data.length})
  }catch(error){
    res.status(400).send(error.message)
  }

})
router.get('/category/product/:id',async (req,res)=>{
  try{
   
    if(req.query.offset){
var a=req.query.offset
    }else{
var a=0
    }
var data=await getCategoryProducts(req.params.id,req.query.limit,a)
res.status(200).send(data)
  }catch(err){
    res.status(400).send(error.message)
  }

})

  module.exports=router