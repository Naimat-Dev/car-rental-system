import db from "../config/db.js";

export const createCard = async (req, res) => {
    try {
        const { userId, cardNumber, cardHolderName, expiryDate, cvv } = req.body;

        if (!userId || !cardNumber || !cardHolderName || !expiryDate || !cvv) {
            return res.status(400).json({ error: "All fields are required, including userId" });
        }
        const insertedCard = await db("card")
            .insert({
                userId,
                cardNumber,
                cardHolderName,
                expiryDate,
                cvv,
            })
            .returning('id');

        const newCardId = Array.isArray(insertedCard) ? insertedCard[0]?.id || insertedCard[0] : insertedCard.id || insertedCard;

        if (!Number.isInteger(newCardId)) {
            throw new Error(`Failed to retrieve a valid new card ID after insertion. Received: ${JSON.stringify(newCardId)}`);
        }

        const newCard = await db("card").where({ id: newCardId }).first();

        res.status(201).json({ message: "Card successfully added", data: newCard });
    } catch (error) {
        console.error("Error inserting card details:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getAllCard = async (req, res) =>{
    try {
        const card = await db.select("*").from("card");
        res.send(card);
    } catch (error) {

        res.status(500).json({error: "error.message"})
    }
    }

   
 export const getCard = async (req, res) =>{

    const {id} = req.params;
    try{
        const card = await db("card").where({id});
        if(card.length !==0){
            res.send(card)
        }
    } catch(error) {

        res.status(500).json({error: "error.message"})
    }


 } 

  export const putCard = async (req, res) =>{

    const {id} = req.params;

    const {userId, cardHolderName, cardNumber, expiryDate, cvv} = req.body;

    try{
        const card = await db("card").where({id}).update({userId, cardHolderName, cardNumber, expiryDate, cvv}, ["userId", "cardHolderName", "cardNumber", "expiryDate", "cvv"])
    
    if (card.length !== 0){
        res.status(200).send(card);
    } else{
        res.status(404).json({error: "Card not dound"})
    } } catch (error){
        res.status(500).json({error: error.message})
    }

  }