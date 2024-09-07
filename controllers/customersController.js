import {
   createOne,
   getAll,
   getOne,
   updateOne,
   deleteOne,
} from './handleFactory.js'

// POST create new customer
export const createCustomer = createOne('customers')

//get all customers
export const getCustomers = getAll('customers')

// GET customers by id
export const getCustomerById = getOne('customers')

// UPDATE customer by id
export const updateCustomerById = updateOne('customers')

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
export const deleteCustomerById = deleteOne('customers')
