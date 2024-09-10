import {
    createOne,
    getAll,
    getOne,
    deleteOne,
  } from "../handleFactory.js";

  import catchAsync from "../../utils/catchAsync.js";
  import AppError from "../../utils/appError.js";
  import db from "../../config/db.js";
import { deleteOneByCarId, getOneByCarId, updateOneByCarId } from "./carController.js";

  export const createCarMedia = createOne('carsMedia'); 

  export const getCarMedia = getAll('carsMedia'); 

  export const getCarMediaById = getOne('carsMedia'); 

  export const updateCarMediaByCarId =catchAsync(async (req, res, next) => {
      const { carId } = req.params; 
      const { addImageUrls = [], removeImageUrls = [], addVideoUrls = [], removeVideoUrls = [] } = req.body;
          // Fetch current media data for the car
          const carMedia = await db('carsMedia').where({carId}).first();
          if (!carMedia) {
              return  next(new AppError('Car media not found' , 404)) 
          }
  
          // Parse the current image and video URLs (they're stored as JSONB)
          let currentImageUrls = carMedia.imageUrls || [];
          let currentVideoUrls = carMedia.videoUrls || [];
  
          // Remove specified image URLs (if any)
          if (removeImageUrls.length > 0) {
              currentImageUrls = currentImageUrls.filter(url => !removeImageUrls.includes(url));
          }
  
          // Add new image URLs (if any)
          if (addImageUrls.length > 0) {
              currentImageUrls = [...new Set([...currentImageUrls, ...addImageUrls])];
          }
  
          // Remove specified video URLs (if any)
          if (removeVideoUrls.length > 0) {
              currentVideoUrls = currentVideoUrls.filter(url => !removeVideoUrls.includes(url));
          }
  
          // Add new video URLs (if any)
          if (addVideoUrls.length > 0) {
              currentVideoUrls = [...new Set([...currentVideoUrls, ...addVideoUrls])]; 
          }
  
          const updateData = {};
  
          // Only update if there are changes to image URLs
          if (addImageUrls.length > 0 || removeImageUrls.length > 0) {
              updateData.imageUrls = JSON.stringify(currentImageUrls);
          }
  
          // Only update if there are changes to video URLs
          if (addVideoUrls.length > 0 || removeVideoUrls.length > 0) {
              updateData.videoUrls = JSON.stringify(currentVideoUrls);
          }
          let doc ;
          // Only update the database if there are changes
          if (Object.keys(updateData).length > 0) {
              updateData.updated_at = db.fn.now();
  
              // Update the media record with the new arrays
              doc =await db('carsMedia')
                  .where({ carId })
                  .update(updateData);
          }
  
          return res.status(200).json({
              status: 'success',
              doc
          });
  });

export const deleteCarMediaById = deleteOne('carsMedia'); 

export const getCarMediaByCarId =getOneByCarId('carsMedia') ;

export const deleteCarMediaByCarId = deleteOneByCarId('carsMedia')
