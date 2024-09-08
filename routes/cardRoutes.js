import express from 'express';
import { validateSchema } from '../middlewares/validationMiddleware.js';
import {
    createCard,
    getCards,
    getCardById,
    updateCardById,
    deleteCardById,
    getCardsJoin,
    getCardByIdJoin
} from '../controllers/cardController.js';
import cardValidationSchema from '../validations/card/cardValidation.js';

const router = express.Router();

// Route to get all cards with related user data
router.get('/all', getCardsJoin);

// Route to get a specific card by ID with related user data
router.get('/all/:id', getCardByIdJoin);

// Routes for card management
router.route('/')
    .post(validateSchema(cardValidationSchema), createCard) // Create a new card
    .get(getCards);    // Get all cards

router.route('/:id')
    .get(getCardById)        // Get card by ID
    .delete(deleteCardById)  // Delete card by ID
    .put(updateCardById);    // Update card by ID

export default router;
