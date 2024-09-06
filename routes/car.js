import express from "express";
import { addCar, deleteCar, getAllCar, getCar, updateCar } from "../controllers/carHandler.js"; 
const router = express.Router();


router.route("/").post(addCar).get(getAllCar).put(updateCar)
router.route("/:id").get(getCar).delete(deleteCar)

export default router;
