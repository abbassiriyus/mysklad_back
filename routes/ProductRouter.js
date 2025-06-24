require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');
const fs=require('fs')
var pool =require('../db');
const { log } = require('console');
var token=process.env.CODE_BASE

async function getAllProducts(id) {
  token=process.env.CODE_BASE
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
      console.log(error)
    return error.message
    
  }
}

async function getProduct(id) {
  token=process.env.CODE_BASE
  try {
    const response = await axios.get(`https://api.moysklad.ru/api/remap/1.2/entity/product/${id}?expand=images`, {
      headers: {
        "Accept":'*/*',
        "User-Agent":'Thunder Client (https://www.thunderclient.com)',
        'Authorization':`Basic ${token}`,
        'Accept-Encoding':'gzip',
      }
    });
    return response.data;
  } catch (error) {
    // req.status(404).send(error.message)
  }
}
const downloadImage = async (url) => {
  token=process.env.CODE_BASE
   const response = await axios.get(url, {
    responseType: 'arraybuffer',
    headers: {
         "Accept":'*/*',
          "User-Agent":'Thunder Client (https://www.thunderclient.com)',
          'Authorization':`Basic ${token}`,
          'Accept-Encoding':'gzip',
    }
  });
  return response.data
};

router.get("/getimage", async (req,res)=>{
  try{
  var url=req.query.url

    var data=await downloadImage(url)
      res.status(200).send(data) 
  }catch(err){
    console.log(err);
    
    res.status(400).send(err.message)
  }
  })



  
router.get("/oneproduct/:id", async (req,res)=>{
try{
  var data=await getProduct(req.params.id);
  res.status(200).send(data)
}catch(err){
  res.status(400).send(err.message)
}
})

 router.get('/product',(req,res)=>{
    var { limit } = req.query; 
    if(!limit){
      limit=1000
    }
 getAllProducts(limit)
  .then(products => {
    res.status(200).send(products)
  })
  .catch(error => {
    res.status(404).send(error.message)
  });
  })

  async function getCategoryProducts(id,limit,offset,search_data) {
    token=process.env.CODE_BASE
    if(!limit){
      limit=100
    }
    try {
   
      const response = await axios.get(`https://api.moysklad.ru/api/remap/1.2/entity/assortment?filter=productFolder=https://api.moysklad.ru/api/remap/1.2/entity/productfolder/${id}&expand=images&limit=${limit}&offset=${offset}`, {
        headers: {
          "Accept":'*/*',
          "User-Agent":'Thunder Client (https://www.thunderclient.com)',
          'Authorization':`Basic ${token}`,
          'Accept-Encoding':'gzip',
        }
      });
var a=(response.data.rows).filter(item=>(item.name).includes(search_data) || (item.description).includes(search_data) )
      return a;
    } catch (error) {
    }
  }

  
  
  
  async function getCategoryProducts1(id,search_data) {
    token=process.env.CODE_BASE
    try {
     
      const response = await axios.get(`https://api.moysklad.ru/api/remap/1.2/entity/assortment?filter=productFolder=https://api.moysklad.ru/api/remap/1.2/entity/productfolder/${id}`, {
        headers: {
          "Accept":'*/*',
          "User-Agent":'Thunder Client (https://www.thunderclient.com)',
          'Authorization':`Basic ${token}`,
          'Accept-Encoding':'gzip',
        }
      });
      var a=(response.data.rows).filter(item=>(item.name).includes(search_data) || (item.description).includes(search_data) )
      return a;
    } catch (error) {
    return error.message
    }
  }
  
router.get('/category/count/:id', async (req,res)=>{
  try{
    if(req.query.search){
      var b=req.query.search
        }else{
      var b=""
          }
var data=await getCategoryProducts1(req.params.id,b)
res.status(200).send({count:data.length})
  }catch(error){
    res.status(400).send(error.message)
  }
})
router.get('/category/product/:id',async (req,res)=>{
  try{
    if(req.query.search){
      var b=req.query.search
        }else{
      var b=""
          }
    if(req.query.offset){
var a=req.query.offset
    }else{
var a=0
    }
var data=await getCategoryProducts(req.params.id,req.query.limit,a,b)
res.status(200).send(data)
  }catch(err){
    res.status(400).send(error.message)
  }

})


  module.exports=router