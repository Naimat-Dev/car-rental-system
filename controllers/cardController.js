import db from "../config/db.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import { createOne, getAll, getOne, updateOne, deleteOne } from "./handleFactory.js";

// POST create new card     
// Route  /cards
export const createCard = createOne("cards");

// GET all cards
// Route /api/cards
export const getCards = getAll("cards");

// GET card by id
// Route /api/card/:id
export const getCardById = getOne("cards");

// DELETE card by id
// Route /api/card/:id
export const deleteCardById = deleteOne("cards");

// UPDATE card by id
// Route /api/card/:id
export const updateCardById = updateOne("cards");

// GET all cards with related user data
// Route /api/cards/all
export const getCardsJoin = catchAsync(async (req, res, next) => {
    const cards = await db('cards')
        .leftJoin('users', 'cards.userId', 'users.id') // Join with users
        .select(
            'cards.id',
            'cards.cardNumber',
            'cards.cardHolderName',
            'cards.expiryDate',
            'cards.cvv',
            'users.id as userId',
            'users.email',
            'users.name'
        );

    res.status(200).json({
        status: 'success',
        data: {
            cards
        }
    });
});

// GET card by id with related user data
// Route /api/cards/all/:id
export const getCardByIdJoin = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const card = await db('cards')
        .leftJoin('users', 'cards.userId', 'users.id') // Join with users
        .select(
            'cards.id',
            'cards.cardNumber',
            'cards.cardHolderName',
            'cards.expiryDate',
            'cards.cvv',
            'users.id as userId',
            'users.email',
            'users.name'
        )
        .where('cards.id', id)
        .first();

    if (!card) {
        return next(new AppError('No card found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            card
        }
    });
});
