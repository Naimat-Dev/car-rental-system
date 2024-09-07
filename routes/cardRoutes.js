import express from 'express';
import { validateSchema } from '../middlewares/validationMiddleware.js';

import { createCard, getCards, getCardById, updateCardById, deleteCardById } from '../controllers/cardController.js';
import cardValidationSchema from '../validations/card/cardValidation.js';
const router = express.Router();

router.route('/').post(validateSchema(cardValidationSchema), createCard).get(getCards);

router.route("/:id").get(getCardById).delete(deleteCardById).put(updateCardById);


export default router;

