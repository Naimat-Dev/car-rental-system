
import { createOne, getAll, getOne, updateOne, deleteOne } from "./handleFactory.js";
import db from "../config/db.js";
import catchAsync from "../utils/catchAsync.js";


// POST create new User Address
// Route  /userAddress
export const createUserAddress = createOne("userAddress");

// GET all users
// Route /api/users
export const getUserAddress = getAll("userAddress");

// GET user by id
// Route /api/user/:id
export const getUserAddressById = getOne("userAddress");

// DELETE user by id
// Route /api/user/:id
export const deleteUserAddressById = deleteOne("userAddress");

// UPDATE user by id
// Route /api/user/:id
export const updateUserAddressById = updateOne("userAddress");


// GET all user addresses with related user data
// Route /api/userAddress
export const getUserAddressJoin = catchAsync(async (req, res, next) => {
    const userAddresses = await db('userAddress')
        .leftJoin('users', 'userAddress.userId', 'users.id') // Join with users
        .select(
            'userAddress.id',
            'userAddress.address',
            'userAddress.city',
            'userAddress.zipCode',
            'userAddress.state',
            'users.id as userId',
            'users.email',
            'users.name',
            'users.phoneNumber'
        );

    res.status(200).json({
        status: 'success',
        data: {
            userAddresses
        }
    });
});



// GET user address by ID with related user data
// Route /api/userAddress/:id
export const getUserAddressByIdJoin = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const userAddress = await db('userAddress')
        .leftJoin('users', 'userAddress.userId', 'users.id') // Join with users
        .select(
            'userAddress.id',
            'userAddress.address',
            'userAddress.city',
            'userAddress.zipCode',
            'userAddress.state',
            'users.id as userId',
            'users.email',
            'users.name',
            'users.phoneNumber'
        )
        .where('userAddress.id', id)
        .first();

    if (!userAddress) {
        return next(new AppError('No user address found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            userAddress
        }
    });
});


// GET all user addresses with related user data and cards
// Route /api/userAddress/with-cards
export const getUserAddressWithCards = catchAsync(async (req, res, next) => {
    const userAddresses = await db('userAddress')
        .leftJoin('users', 'userAddress.userId', 'users.id') // Join with users
        .leftJoin('cards', 'users.id', 'cards.userId') // Join with cards
        .select(
            'userAddress.id',
            'userAddress.address',
            'userAddress.city',
            'userAddress.zipCode',
            'userAddress.state',
            'users.id as userId',
            'users.email',
            'users.name',
            'users.phoneNumber',
            'cards.cardNumber',
            'cards.cardHolderName',
            'cards.expiryDate'
        );

    res.status(200).json({
        status: 'success',
        data: {
            userAddresses
        }
    });
});
