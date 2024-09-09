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


export const getAllUsersWithDetails = catchAsync(async (req, res, next) => {
    const users = await db('users as u')
        .leftJoin('userAddress as ua', 'u.id', 'ua.userId')
        .leftJoin('cards as c', 'u.id', 'c.userId')
        .select('*');  

    // Remove sensitive fields such as password, CVV, etc.
    const usersWithoutSensitiveData = users.map(({ password, passwordResetToken, passwordResetExpires, cvv, ...rest }) => rest);

    res.status(200).json({
        status: 'success',
        doc: {
            users: usersWithoutSensitiveData
        }
    });
});

// GET user by id with address and cards
// Route /api/users/:id
export const getUserByIdJoin = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const user = await db('users as u')
        .leftJoin('userAddress as ua', 'u.id', 'ua.userId')
        .leftJoin('cards as c', 'u.id', 'c.userId')
        .select('*')  // Select all fields from the joined tables
        .where('u.id', id)
        .first();

    if (!user) return next(new AppError('No user found with that ID', 404));

    // Remove sensitive fields such as the password
    const { password, ...userWithoutPassword } = user;

    res.status(200).json({
        status: 'success',
        doc: { user: userWithoutPassword }
    });
});
