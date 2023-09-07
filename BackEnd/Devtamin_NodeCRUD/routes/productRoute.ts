const express = require('express')
//import { Request, Response } from 'express';
//const Product = require('../models/productModel')
const 
{   getProducts, 
    getProduct, 
    createProduct,
    updateProduct, 
    deleteProduct
} = require('../controllers/productController')

const router = express.Router();

// Route To Get all data    
router.get('/', getProducts)

// Route To Get data by Id
router.get('/:id', getProduct)

// Route To Add data
router.post('/', createProduct)

// Route To Update data
router.put('/:id', updateProduct)

// Route To Delete data
router.delete('/:id', deleteProduct)

module.exports = router

