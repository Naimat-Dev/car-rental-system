import Joi from "joi";

const carMediaSchema = Joi.object({
    carId: Joi.number().integer().positive().required(),
    imageUrls: Joi.array().items(Joi.string().uri().max(255)).optional(), // Array of image URLs
    videoUrls: Joi.array().items(Joi.string().uri().max(255)).optional() // Array of video URLs
});

export default  carMediaSchema;
