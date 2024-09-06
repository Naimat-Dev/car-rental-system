import express from 'express';
import {
  createCarSpecification,
  getCarSpecifications,
  getCarSpecificationById,
  updateCarSpecificationById,
  deleteCarSpecificationById
} from '../controllers/carSpecificationController.js';

const router = express.Router();

router.route('/')
  .post(createCarSpecification)
  .get(getCarSpecifications);

router.route('/:id')
  .get(getCarSpecificationById)
  .put(updateCarSpecificationById)
  .delete(deleteCarSpecificationById);

export default router;