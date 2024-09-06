import express from 'express';
import {
  createCarType,
  getCarTypes,
  getCarTypeById,
  updateCarTypeById,
  deleteCarTypeById
} from '../controllers/carTypeController.js';

const router = express.Router();

router.route('/')
  .post(createCarType)
  .get(getCarTypes);

router.route('/:id')
  .get(getCarTypeById)
  .put(updateCarTypeById)
  .delete(deleteCarTypeById);

export default router;