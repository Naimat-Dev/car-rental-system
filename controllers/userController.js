import db from "../config/db.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

// Create a new user
export const createUser = catchAsync(async (req, res, next) => {
    const { email, name, phoneNumber, status, registrationDate, image, cnic, role, passwordChangedAt, passwordResetToken, passwordResetExpires } = req.body;

    if (!email || !name || !phoneNumber || !status || !registrationDate) {
        return next(new AppError("All required fields must be provided", 400));
    }

    const [insertedUser] = await db("users")
        .insert({
            email,
            name,
            phoneNumber,
            status,
            registrationDate,
            image,
            cnic
        })
        .returning('*');

    if (!insertedUser) {
        return next(new AppError("Failed to retrieve the newly created user", 500));
    }

    res.status(201).json({ message: "User successfully created", data: insertedUser });
});

// Get all users
export const getUsers = catchAsync(async (req, res, next) => {
    const users = await db.select("*").from("users");
    res.status(200).json(users);
});

// Get a specific user by ID
export const getUserById = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const user = await db("users").where({ id }).first();

    if (user) {
        res.status(200).json(user);
    } else {
        return next(new AppError("User not found", 404));
    }
});

// Update a specific user by ID
export const updateUserById = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { email, name, phoneNumber, status, registrationDate, image, cnic, role, passwordChangedAt, passwordResetToken, passwordResetExpires } = req.body;

    const [updatedUser] = await db("users")
        .where({ id })
        .update({
            email,
            name,
            phoneNumber,
            status,
            registrationDate,
            image,
            cnic,
            role,
            passwordChangedAt,
            passwordResetToken,
            passwordResetExpires
        }, ["id", "email", "name", "phoneNumber", "status", "registrationDate", "image", "cnic", "role", "passwordChangedAt", "passwordResetToken", "passwordResetExpires"]);

    if (updatedUser) {
        res.status(200).json({ message: "User successfully updated", data: updatedUser });
    } else {
        return next(new AppError("User not found", 404));
    }
});

// Delete a specific user by ID
export const deleteUserById = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const deletedCount = await db("users").where({ id }).del();

    if (deletedCount) {
        res.status(204).send();
    } else {
        return next(new AppError("User not found", 404));
    }
});
