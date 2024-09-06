import db from "../config/db.js";

// Create a new user
export const createUser = async (req, res) => {
    try {
        const { email, name, phoneNumber, status, registrationDate, image, cnic, role, passwordChangedAt, passwordResetToken, passwordResetExpires } = req.body;

        if (!email || !name || !phoneNumber || !status || !registrationDate) {
            return res.status(400).json({ error: "All required fields must be provided" });
        }

        const [insertedUser] = await db("user")
            .insert({
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
            })
            .returning('*');

        if (!insertedUser) {
            throw new Error("Failed to retrieve the newly created user");
        }

        res.status(201).json({ message: "User successfully created", data: insertedUser });
    } catch (error) {
        console.error("Error creating user:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await db.select("*").from("user");
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get a specific user by ID
export const getUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await db("user").where({ id }).first();

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error("Error fetching user:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Update a specific user by ID
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { email, name, phoneNumber, status, registrationDate, image, cnic, role, passwordChangedAt, passwordResetToken, passwordResetExpires } = req.body;

    try {
        const [updatedUser] = await db("user")
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
            }, ["id", "email", "name", "phoneNumber", "status", "registrationDate", "image", "cnic", "role", "passwordChangedAt", "passwordResetToken", "passwordResetExpires"]) // Retrieve updated user fields

        if (updatedUser) {
            res.status(200).json({ message: "User successfully updated", data: updatedUser });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error("Error updating user:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Delete a specific user by ID
export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCount = await db("user").where({ id }).del();

        if (deletedCount) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error("Error deleting user:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
