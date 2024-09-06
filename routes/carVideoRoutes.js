import express from 'express';
import {
  createCarVideo,
  getCarVideos,
  getCarVideoById,
  updateCarVideoById,
  deleteCarVideoById
} from '../controllers/carVideoController.js';

const router = express.Router();

router.route('/')
  .post(createCarVideo)
  .get(getCarVideos);

router.route('/:id')
  .get(getCarVideoById)
  .put(updateCarVideoById)
  .delete(deleteCarVideoById);

export default router;