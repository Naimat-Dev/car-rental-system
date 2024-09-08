import db from "../config/db.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import { createOne, getAll, getOne, updateOne, deleteOne } from "./handleFactory.js";


// POST create new user
// Route  /users
export const createUser = createOne("users");

// GET all users
// Route /api/users
export const getUsers = getAll("users");

// GET user by id
// Route /api/user/:id
export const getUserById = getOne("users");

// DELETE user by id
// Route /api/user/:id
export const deleteUserById = deleteOne("users");

// UPDATE user by id
// Route /api/user/:id
export const updateUserById = updateOne("users");


// GET all users with their addresses and cards
// Route /api/users/join
export const getAllUsersWithDetails = catchAsync(async (req, res, next) => {
    const users = await db('users')
        .leftJoin('userAddress', 'users.id', 'userAddress.userId') // Left join userAddress
        .leftJoin('cards', 'users.id', 'cards.userId') // Left join cards
        .select(
            'users.id',
            'users.email',
            'users.name',
            'users.phoneNumber',
            'users.status',
            'users.registrationDate',
            'users.image',
            'users.cnic',
            'users.role',
            'users.passwordChangedAt',
            'users.passwordResetToken',
            'users.passwordResetExpires',
            'userAddress.address',
            'userAddress.city',
            'userAddress.zipCode',
            'userAddress.state',
            'cards.cardNumber',
            'cards.cardHolderName',
            'cards.expiryDate',
            'cards.cvv'
        );

    res.status(200).json({
        status: 'success',
        data: {
            users
        }
    });
});

// GET user by id with address and cards
// Route /api/users/:id
export const getUserByIdJoin = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const user = await db('users')
        .leftJoin('userAddress', 'users.id', 'userAddress.userId') // Join with userAddress table
        .leftJoin('cards', 'users.id', 'cards.userId') // Join with cards table
        .select(
            'users.id',
            'users.email',
            'users.name',
            'users.phoneNumber',
            'users.status',
            'users.registrationDate',
            'users.image',
            'users.cnic',
            'users.role',
            'users.passwordChangedAt',
            'users.passwordResetToken',
            'users.passwordResetExpires',
            'userAddress.address',
            'userAddress.city',
            'userAddress.zipCode',
            'userAddress.state',
            'cards.cardNumber',
            'cards.cardHolderName',
            'cards.expiryDate',
            'cards.cvv'
        )
        .where('users.id', id)
        .first();

    if (!user) {
        return next(new AppError('No user found with that ID', 404));
    }

    const { password, ...userWithoutPassword } = user;

    res.status(200).json({
        status: 'success',
        data: {
            user: userWithoutPassword
        }
    });
});
