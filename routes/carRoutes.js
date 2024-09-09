import express from "express";
import {createCar,deleteCarById,getCarById,updateCarById,getCars,getCarDetailsWithJoinById,getCarsDetailsWithJoin} from "../controllers/cars/carController.js"; 
const router = express.Router();
import { validateSchema } from "../middlewares/validationMiddleware.js";
import carValidationSchema from "../validations/car/carValidation.js";
import brandRoutes from "./brandRoutes.js";
import carSpecificationRoutes from "./carSpecificationRoutes.js";
import carStatusRoutes from "./carStatusRoutes.js"
import carsMediaRoutes from "./carsMediaRoutes.js"
import carTypesRoutes from "./carTypeRoutes.js"
router.use('/brands', brandRoutes);
router.use("/types",carTypesRoutes)
router.use('/specifications', carSpecificationRoutes);
router.use('/status', carStatusRoutes);
router.use("/media",carsMediaRoutes);
// Define routes for the /cars endpoint
router.route('/')
    .post(validateSchema(carValidationSchema),createCar)  // Handle POST requests to create a new car
    .get(getCars);    // Handle GET requests to retrieve all cars


    router.get("/")
// Define routes for the /cars/:id endpoint
router.route('/:id')
    .get(getCarById)      // Handle GET requests to retrieve a specific car by its ID
    .put(updateCarById)   // Handle PUT requests to update a car by its ID
    .delete(deleteCarById); // Handle DELETE requests to remove a car by its ID

router.get("/all/:id",getCarDetailsWithJoinById )
router.get("/all" ,getCarsDetailsWithJoin)



export default router;
