import db from "../config/db.js";

// Create a new card
export const createCard = async (req, res) => {
    try {
        const { userId, cardNumber, cardHolderName, expiryDate, cvv } = req.body;

        if (!userId || !cardNumber || !cardHolderName || !expiryDate || !cvv) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const [insertedCard] = await db("card")
            .insert({
                userId,
                cardNumber,
                cardHolderName,
                expiryDate,
                cvv
            })
            .returning('*');

        if (!insertedCard) {
            throw new Error("Failed to retrieve the newly created card");
        }

        res.status(201).json({ message: "Card successfully added", data: insertedCard });
    } catch (error) {
        console.error("Error inserting card details:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get all cards
export const getAllCards = async (req, res) => {
    try {
        const cards = await db.select("*").from("card");
        res.status(200).json(cards);
    } catch (error) {
        console.error("Error fetching cards:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get a specific card by ID
export const getCard = async (req, res) => {
    const { id } = req.params;

    try {
        const card = await db("card").where({ id }).first(); // Use `.first()` to get a single record

        if (card) {
            res.status(200).json(card);
        } else {
            res.status(404).json({ error: "Card not found" });
        }
    } catch (error) {
        console.error("Error fetching card:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Update a specific card by ID
export const updateCard = async (req, res) => {
    const { id } = req.params;
    const { userId, cardHolderName, cardNumber, expiryDate, cvv } = req.body;

    try {
        const [updatedCard] = await db("card").where({ id }).update({
            userId,
            cardHolderName,
            cardNumber,
            expiryDate,
            cvv
        }, ["id", "userId", "cardHolderName", "cardNumber", "expiryDate", "cvv"]);

        if (updatedCard) {
            res.status(200).json({ message: "Card successfully updated", data: updatedCard });
        } else {
            res.status(404).json({ error: "Card not found" });
        }
    } catch (error) {
        console.error("Error updating card:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Delete a specific card by ID
export const deleteCard = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCount = await db("card").where({ id }).del();

        if (deletedCount) {
            res.status(204).send(); 
        } else {
            res.status(404).json({ error: "Card not found" });
        }
    } catch (error) {
        console.error("Error deleting card:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
