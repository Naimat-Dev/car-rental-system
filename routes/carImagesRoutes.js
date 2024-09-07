import express from 'express';
import {
    createCarImages,
    getCarImages,
    getCarImagesById,
    deleteCarImagesById,
    updateCarImagesById
} from '../controllers/carImagesController.js';

const router = express.Router();


router.route('/')
    .post(createCarImages)
    .get(getCarImages);


router.route('/:id')
    .get(getCarImagesById)
    .delete(deleteCarImagesById)
    .put(updateCarImagesById);

export default router;
