import express from "express";
import { addCar, deleteCar, getAllCar, getCar, updateCar } from "../controllers/Carhandler.js"; // Updated with .js extension
const Router = express.Router();

Router.post("/addcar", addCar);

Router.get("/allcars", getAllCar);
Router.get("/getcar/:id" , getCar)


Router.post("/deletecar" ,deleteCar)
Router.post("/updatecar",updateCar)

export default Router;
