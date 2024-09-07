import express from 'express';
import {
    createCarStatus,
    getCarStatus,
    getCarStatusById,
    deleteCarStatusById,
    updateCarStatusById
} from '../controllers/carStatusController.js';

const router = express.Router();

router.route('/')
    .post(createCarStatus)
    .get(getCarStatus);


router.route('/:id')
    .get(getCarStatusById)
    .delete(deleteCarStatusById)
    .put(updateCarStatusById);

export default router;
