import express from 'express';

import { getCard, getAllCard, putCard, delet } from '../controllers/cardController';

const router = express.Router();

router.post('/', createCard);
router.get('/', getAllCard);
router.get('/:id', getCard)
router.put('/:id', putCard)

export default router;
