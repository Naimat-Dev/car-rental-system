import db from '../config/db.js'
import catchAsync from '../utils/catchAsync.js'
import { createOne, getAll } from './handleFactory.js'

// Function to create a new customer
export const createCustomer = createOne('customers')

// Function to get all customers
export const getCustomers = getAll('customers')

export const getCustomersWithJoin = catchAsync(async (req, res, next) => {
   console.log('first')
   //  const doc = await db('customerAddress')
   //     .join('customers', 'customers.id', '=', 'customerAddress.customerId')
   //     .select('customerAddress.*', 'customers.name', 'customers.email')
   //     .where({ 'customerAddress.customerId': id })

   const doc = await db.raw('select * from customers')

   console.log('JOIn data: ', doc)

   res.send('Join')
})

// Function to get a customer by ID
export const getCustomerById = async (req, res) => {
   try {
      const { id } = req.params

      const customer = await db('customers').where({ id }).first()

      if (!customer) {
         return res.status(404).json({ error: 'Customer not found' })
      }

      res.status(200).json({
         message: 'Customer fetched successfully',
         data: customer,
      })
   } catch (error) {
      console.error('Error fetching customer by ID:', error)
      res.status(500).json({
         error: 'Internal Server Error',
         details: error.message,
      })
   }
}

// Function to update a customer by ID
export const updateCustomerById = async (req, res) => {
   try {
      const { id } = req.params
      const {
         firstName,
         lastName,
         password,
         cnic,
         phoneNumber,
         dateOfBirth,
         imageUrl,
         status,
      } = req.body

      const existingCustomer = await db('customers').where({ id }).first()
      if (!existingCustomer) {
         return res.status(404).json({ error: 'Customer not found' })
      }

      const updateData = {}
      if (firstName) updateData.firstName = firstName
      if (lastName) updateData.lastName = lastName
      if (password) updateData.password = password
      if (cnic) updateData.cnic = cnic
      if (phoneNumber) updateData.phoneNumber = phoneNumber
      if (dateOfBirth) updateData.dateOfBirth = dateOfBirth
      if (imageUrl) updateData.imageUrl = imageUrl
      if (status) updateData.status = status

      if (cnic || phoneNumber) {
         const customerConflict = await db('customers')
            .whereNot({ id })
            .andWhere((builder) => {
               if (cnic) builder.where('cnic', cnic)
               if (phoneNumber) builder.orWhere('phoneNumber', phoneNumber)
            })
            .first()

         if (customerConflict) {
            return res.status(409).json({
               error: 'CNIC or phone number already exists. Please provide unique details.',
            })
         }
      }

      await db('customers').where({ id }).update(updateData)

      const updatedCustomer = await db('customers').where({ id }).first()

      res.status(200).json({
         message: 'Customer updated successfully',
         data: updatedCustomer,
      })
   } catch (error) {
      console.error('Error updating customer:', error)
      res.status(500).json({
         error: 'Internal Server Error',
         details: error.message,
      })
   }
}

// Function to delete a customer by ID
export const deleteCustomerById = async (req, res) => {
   try {
      const { id } = req.params

      const existingCustomer = await db('customers').where({ id }).first()
      if (!existingCustomer) {
         return res.status(404).json({ error: 'Customer not found' })
      }

      await db('customers').where({ id }).del()

      res.status(200).json({
         message: 'Customer deleted successfully',
         data: existingCustomer,
         id,
      })
   } catch (error) {
      console.error('Error deleting customer:', error)
      res.status(500).json({
         error: 'Internal Server Error',
         details: error.message,
      })
   }
}
