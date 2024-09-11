import { getAll, getOne, deleteOne } from "../handleFactory.js";

import catchAsync from "../utils/catchAsync.js";

// Create a new car condition
export const createCarCondition = catchAsync(async (req, res) => {
  const { carId, conditionType, imageUrls, videoUrls } = req.body;

  if (!carId || !conditionType) {
    return res
      .status(400)
      .json({ error: "carId and conditionType are required." });
  }

  const [newCarConditionId] = await knex("carConditions")
    .insert({
      carId,
      conditionType,
      imageUrls: JSON.stringify(imageUrls || []), // Store imageUrls as JSON
      videoUrls: JSON.stringify(videoUrls || []), // Store videoUrls as JSON
    })
    .returning("id");

  res.status(201).json({
    message: "Car condition created successfully.",
    carConditionId: newCarConditionId,
  });
});

// Function to get all car condition
export const getCarConditions = getAll("carConditions");

// Function to get a car condition
export const getCarConditionById = getOne("carConditions");

// Update an existing car condition condition
export const updateCarConditionById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { conditionType, imageUrls, videoUrls } = req.body;

  const existingCarCondition = await knex("carConditions")
    .where({ id })
    .first();
  if (!existingCarCondition) {
    return res.status(404).json({ error: "Car condition not found." });
  }

  // Update the car condition
  await knex("carConditions")
    .where({ id })
    .update({
      conditionType: conditionType || existingCarCondition.conditionType,
      imageUrls: imageUrls
        ? JSON.stringify(imageUrls)
        : existingCarCondition.imageUrls,
      videoUrls: videoUrls
        ? JSON.stringify(videoUrls)
        : existingCarCondition.videoUrls,
    });

  res.status(200).json({ message: "Car condition updated successfully." });
});

// Function to delete a car by ID
export const deleteCarConditionById = deleteOne("carConditions");
