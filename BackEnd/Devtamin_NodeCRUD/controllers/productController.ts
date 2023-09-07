import { Request, Response } from 'express';
import Product from '../models/productModel';
import asyncHandler from 'express-async-handler';

// logic to get all products
const getProducts = asyncHandler(async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    const castedError = error as Error; // Type assertion
    res.status(500);
    throw new Error(castedError.message);
  }
});

// logic to get a single product
const getProduct = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      res.status(404);
      throw new Error(`Cannot find any product with ID ${id}`);
    }
    res.status(200).json(product);
  } catch (error) {
    const castedError = error as Error; // Type assertion
    res.status(500);
    throw new Error(castedError.message);
  }
});

// logic to create new product
const createProduct = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { _id, ...productData } = req.body;
    const product = await Product.create(productData);
    res.status(200).json(product);
  } catch (error) {
    const castedError = error as Error; // Type assertion
    res.status(500);
    throw new Error(castedError.message);
  }
});

// logic to update product
const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!product) {
      res.status(404);
      throw new Error(`Cannot find any product with ID ${id}`);
    }
    res.status(200).json(product);
  } catch (error) {
    const castedError = error as Error; // Type assertion
    res.status(500);
    throw new Error(castedError.message);
  }
});

// // logic to delete product

  const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const product = await Product.findByIdAndRemove(id);
      if (!product) {
        res.status(404);
        throw new Error(`Cannot find any product with ID ${id}`);
      }
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      const castedError = error as Error; // Type assertion
      res.status(500);
      throw new Error(castedError.message);
    }
  });
  

export {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
