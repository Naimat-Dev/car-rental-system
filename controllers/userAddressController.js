import db from '../config/db.js';

// Create a new user address
export const createUserAddress = async (req, res) => {
    try {
        const { userId, address, city, zipCode, state } = req.body;

        if (!userId || !address || !city || !zipCode || !state) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const [insertedAddress] = await db("userAddress")
            .insert({ userId, address, city, zipCode, state })
            .returning('*'); // Retrieve the newly inserted address

        if (!insertedAddress) {
            throw new Error("Failed to retrieve the newly created address");
        }

        res.status(201).json({ message: "User address successfully created", data: insertedAddress });
    } catch (error) {
        console.error("Error creating user address:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get all user addresses
export const getUserAddress = async (req, res) => {
    try {
        const addresses = await db.select("*").from("userAddress");
        res.status(200).json(addresses);
    } catch (error) {
        console.error("Error fetching user addresses:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get a specific user address by ID
export const getUserAddressById = async (req, res) => {
    const { id } = req.params;

    try {
        const address = await db("userAddress").where({ id }).first(); // Use `.first()` to get a single object

        if (address) {
            res.status(200).json(address);
        } else {
            res.status(404).json({ error: "User address not found" });
        }
    } catch (error) {
        console.error("Error fetching user address:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Update a specific user address by ID
export const updateUserAddressById = async (req, res) => {
    const { id } = req.params;
    const { userId, address, city, zipCode, state } = req.body;

    try {
        const [updatedAddress] = await db("userAddress")
            .where({ id })
            .update({ userId, address, city, zipCode, state }, ["id", "userId", "address", "city", "zipCode", "state"]); // Retrieve updated fields

        if (updatedAddress) {
            res.status(200).json({ message: "User address successfully updated", data: updatedAddress });
        } else {
            res.status(404).json({ error: "User address not found" });
        }
    } catch (error) {
        console.error("Error updating user address:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Delete a specific user address by ID
export const deleteUserAddressById = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCount = await db("userAddress").where({ id }).del();

        if (deletedCount) {
            res.status(204).send(); // No content to return after deletion
        } else {
            res.status(404).json({ error: "User address not found" });
        }
    } catch (error) {
        console.error("Error deleting user address:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
