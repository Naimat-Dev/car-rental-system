import express from 'express';
import {
    createBrand,
    getBrands,
    getBrandById,
    deleteBrandById,
    updateBrandById
} from '../controllers/brandController.js';

const router = express.Router();

// Define routes for the /brands endpoint
router.route('/')
    .post(createBrand)  // Handle POST requests to create a new brand
    .get(getBrands);    // Handle GET requests to retrieve all brands

// Define routes for the /brands/:id endpoint
router.route('/:id')
    .get(getBrandById)      // Handle GET requests to retrieve a brand by its ID
    .delete(deleteBrandById) // Handle DELETE requests to remove a brand by its ID
    .put(updateBrandById);   // Handle PUT requests to update a brand by its ID

export default router;
