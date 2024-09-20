import express from 'express'
import {
   createCard,
   getCards,
   getCardById,
   updateCardByOwnerId,
   deleteCardById,
   joinCardsWithUsers,
   joinCardsWithUsersByOwnerId
} from '../../controllers/user/cardController.js'

import cardValidationSchema from '../../validations/card/cardValidation.js'
import { validateSchema } from '../../middlewares/validationMiddleware.js'

const router = express.Router()

router.get('/all', joinCardsWithUsers)

router.get('/all/:id', joinCardsWithUsersByOwnerId);

router
   .route('/')
   .post(validateSchema(cardValidationSchema), createCard)
   .get(getCards)

router.route('/:id').get(getCardById).delete(deleteCardById).put(updateCardByOwnerId)

export default router
