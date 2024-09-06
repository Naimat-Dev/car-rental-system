import express from 'express';

import { getCard, getAllCard, updateCard, deleteCard } from '../controllers/cardController';

const router = express.Router();

router.post('/', createCard);
router.get('/', getAllCard);
router.get('/:id', getCard)
router.put('/:id', updateCard)
router.delete('/:id', deleteCard)

export default router;
