import db from "../config/db.js";
export const addCar = async (req, res) => {
    try {
      const { name, brandId, modelYear, registrationNumber, registrationCity, description, carDocument, carTypeId } = req.body;
      const response = await db("car").insert({
        name,
        brandId,
        modelYear,
        registrationNumber,
        registrationCity,
        description,
        carDocument,
        carTypeId,
      })
      res.status(201).json({ message: "Car added successfully", carId: response });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error adding car" });
    }
  };
  
export const getAllCar = async (req, res) => {
    try {
      const response = await db("car").select("*");
      if(response.length !== 0){
        res.status(200).json(response);
      }
      else{
        res.statue(301).json ({message :"No data Found"})
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching cars" });
    }
  };

export const getCar =async (req,res) =>{
    try {
        const {id} = req.params;
        const response = await db("car").select("name", "modelYear").where({id})
        if(response.length !==0){
            res.status(200).json ({response})
        }
        else{
            res.status(301).json ({message : "No "})
        }
    } catch (error) {
        console.log(error)
        
    }
}
export const deleteCar = async (req,res)=>{
    try {
      const {id} = req.params;

        const response = await db('car').where({ id }).del();
    
        if (response === 0) {
          return res.status(404).json({ message: "Car not found" });
        }
    
        res.status(200).json({ message: "Car deleted successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting car" });
      }
}
export const updateCar = async (req,res) =>{
    try {
        const {id,  name, brandId, modelYear, registrationNumber, registrationCity, description, carDocument, carTypeId } = req.body; 
        const response = await db('car')
          .where({ id })
          .update({
            name,
            brandId,
            modelYear,
            registrationNumber,
            registrationCity,
            description,
            carDocument,
            carTypeId,
          });
    
        if (response === 0) {
          return res.status(404).json({ message: "Car not found" });
        }
    
        res.status(200).json({ message: "Car updated successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating car" });
      }
}