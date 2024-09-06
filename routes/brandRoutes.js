import express from 'express';
import {
    createBrand,
    getBrands,
    getBrandById,
    deleteBrandById,
    updateBrandById
} from '../controllers/brandController.js';

const router = express.Router();

router.route('/')
    .post(createBrand)
    .get(getBrands);

router.route('/:id')
    .get(getBrandById)
    .delete(deleteBrandById)
    .put(updateBrandById);

export default router;
