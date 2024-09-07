import db from '../config/db.js'
import { getAll } from './handleFactory.js'

// Function to create a new customer address
export const createCustomerAddress = async (req, res) => {
   try {
      const { customerId, address, city, state, zipCode, country } = req.body

      if (!customerId || !address || !city || !state || !zipCode || !country) {
         return res.status(400).json({ error: 'All fields are required' })
      }

      const insertedAddress = await db('customerAddress')
         .insert({
            customerId,
            address,
            city,
            state,
            zipCode,
            country,
         })
         .returning('id')

      const newAddressId = Array.isArray(insertedAddress)
         ? insertedAddress[0]?.id || insertedAddress[0]
         : insertedAddress.id || insertedAddress

      if (!Number.isInteger(newAddressId)) {
         throw new Error(
            `Failed to retrieve a valid new address ID after insertion. Received: ${JSON.stringify(
               newAddressId
            )}`
         )
      }

      const newAddress = await db('customerAddress')
         .where({ id: newAddressId })
         .first()

      res.status(201).json({
         message: 'Customer address created successfully',
         data: newAddress,
      })
   } catch (error) {
      console.error('Error creating customer address:', error)
      res.status(500).json({
         error: 'Internal Server Error',
         details: error.message,
      })
   }
}

// // Function to get all customer addresses
export const getCustomerAddress = getAll('customerAddress')

// Function to get a customer address by ID
export const getCustomerAddressById = async (req, res) => {
   try {
      const { id } = req.params

      const address = await db('customerAddress').where({ id }).first()

      if (!address) {
         return res.status(404).json({ error: 'Customer address not found' })
      }

      res.status(200).json({
         message: 'Customer address fetched successfully',
         data: address,
      })
   } catch (error) {
      console.error('Error fetching customer address by ID:', error)
      res.status(500).json({
         error: 'Internal Server Error',
         details: error.message,
      })
   }
}

// Function to update a customer address by ID
export const updateCustomerAddressById = async (req, res) => {
   try {
      const { id } = req.params
      const { address, city, state, zipCode, country } = req.body

      const existingAddress = await db('customerAddress').where({ id }).first()
      if (!existingAddress) {
         return res.status(404).json({ error: 'Customer address not found' })
      }

      await db('customerAddress').where({ id }).update({
         address,
         city,
         state,
         zipCode,
         country,
      })

      const updatedAddress = await db('customerAddress').where({ id }).first()

      res.status(200).json({
         message: 'Customer address updated successfully',
         data: updatedAddress,
      })
   } catch (error) {
      console.error('Error updating customer address:', error)
      res.status(500).json({
         error: 'Internal Server Error',
         details: error.message,
      })
   }
}

// Function to delete a customer address by ID
export const deleteCustomerAddressById = async (req, res) => {
   try {
      const { id } = req.params

      const existingAddress = await db('customerAddress').where({ id }).first()
      if (!existingAddress) {
         return res.status(404).json({ error: 'Customer address not found' })
      }

      await db('customerAddress').where({ id }).del()

      res.status(200).json({ message: 'Customer address deleted successfully' })
   } catch (error) {
      console.error('Error deleting customer address:', error)
      res.status(500).json({
         error: 'Internal Server Error',
         details: error.message,
      })
   }
}
