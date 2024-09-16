import db from "../../config/db.js";

import { getAll, getOne, deleteOne } from "../handleFactory.js";
import catchAsync from "../../utils/catchAsync.js";
// import catchAsync from "../utils/catchAsync.js";

// Create a new car condition
export const createCarCondition = catchAsync(async (req, res) => {
  const { carId, conditionType, imageUrls, videoUrls } = req.body;

  if (!carId || !conditionType) {
    return res
      .status(400)
      .json({ error: "carId and conditionType are required." });
  }

  const doc = await db("car_conditions")
    .insert({
      carId,
      conditionType,
      imageUrls: JSON.stringify(imageUrls || []), // Store imageUrls as JSON
      videoUrls: JSON.stringify(videoUrls || []), // Store videoUrls as JSON
    })
    .returning("id");

  res.status(201).json({
    message: "Car condition created successfully.",
    doc,
  });
});

// Function to get all car
export const getCarConditions = getAll("car_conditions");

// Function to get a car
export const getCarConditionById = getOne("car_conditions");

// Update an existing car condition condition
export const updateCarConditionById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { conditionType, imageUrls, videoUrls } = req.body;

  const existingCarCondition = await db("car_conditions").where({ id }).first();
  if (!existingCarCondition) {
    return res.status(404).json({ error: "Car condition not found." });
  }

  // Update the car condition
  await db("car_conditions")
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
  res.status(201).json({
    message: "Car condition created successfully.",
  });
});

// Function to delete a customer address by ID
export const deleteCarConditionById = deleteOne("car_conditions");
