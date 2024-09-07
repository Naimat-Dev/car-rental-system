import express from 'express';

import { createCard, getCards, getCardById, updateCardById, deleteCardById } from '../controllers/cardController.js';
const router = express.Router();

router.route('/').post(createCard).get(getCards);

router.route("/:id").get(getCardById).delete(deleteCardById).put(updateCardById);


export default router;

