import express from "express";
import {createCar,deleteCarById,getCarbyId,updateCarById,getCars} from "../controllers/carHandler.js"; 
const router = express.Router();


router.route("/").post(createCar).get(getCars)
router.route("/:id").delete(deleteCarById).put(updateCarById).get(getCarbyId)

export default router;
