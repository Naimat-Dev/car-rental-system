import db from '../../config/db.js'
import bcrypt from 'bcrypt'

import catchAsync from '../../utils/catchAsync.js'

import { getAll, getOne, updateOne, deleteOne } from '../handleFactory.js'

// Create customer
export const createCustomer = catchAsync(async (req, res, next) => {
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

   const existingCustomer = await db('customers')
      .where({ cnic })
      .orWhere({ phoneNumber })
      .first()
   if (existingCustomer) {
      return next(
         new AppError(
            'Customer with this CNIC or phone number already exists',
            400
         )
      )
   }

   // Hash the password before saving
   const hashedPassword = await bcrypt.hash(password, 12)

   const doc = await db('customers')
      .insert({
         firstName,
         lastName,
         password: hashedPassword, // Save the hashed password
         cnic,
         phoneNumber,
         dateOfBirth,
         imageUrl,
         status: status || 'inactive',
      })
      .returning('*')

   res.status(201).json({
      status: 'success',
      doc,
   })
})

//get all customers
export const getCustomers = getAll('customers')

// GET customers by id
export const getCustomerById = getOne('customers')

// UPDATE customer by id
export const updateCustomerById = updateOne('customers')

// Function to delete a customer by ID
export const deleteCustomerById = deleteOne('customers')

//Get customer details by ID (joins)
export const joinCustomerDetailsById = catchAsync(async (req, res, next) => {
   const { id } = req.params

   const doc = await db('customers')
      .join('customerAddress', 'customers.id', 'customerAddress.customerId')
      .join('customerLicense', 'customers.id', 'customerLicense.customerId')
      .select(
         'customers.id',
         'customers.firstName',
         'customers.lastName',
         'customers.cnic',
         'customers.phoneNumber',
         'customers.dateOfBirth',
         'customers.imageUrl',
         'customers.status',
         'customerAddress.address',
         'customerAddress.city',
         'customerAddress.state',
         'customerAddress.zipCode',
         'customerAddress.country',
         'customerLicense.drivingLicenseNumber',
         'customerLicense.licenseExpiryDate'
      )
      .where('customers.id', id)

   if (doc.length === 0) {
      return next(new AppError('Customer not found by that ID.', 404))
   }

   res.status(200).json({
      status: 'success',
      doc,
   })
})

//Get all customer details (joins)
export const joinCustomersDetails = catchAsync(async (req, res, next) => {
   const doc = await db('customers')
      .join('customerAddress', 'customers.id', 'customerAddress.customerId')
      .join('customerLicense', 'customers.id', 'customerLicense.customerId')
      .select(
         'customers.id',
         'customers.firstName',
         'customers.lastName',
         'customers.cnic',
         'customers.phoneNumber',
         'customers.dateOfBirth',
         'customers.imageUrl',
         'customers.status',
         'customerAddress.address',
         'customerAddress.city',
         'customerAddress.state',
         'customerAddress.zipCode',
         'customerAddress.country',
         'customerLicense.drivingLicenseNumber',
         'customerLicense.licenseExpiryDate'
      )

   if (doc.length === 0) {
      return next(new AppError('No customers found.', 404))
   }

   res.status(200).json({
      status: 'success',
      doc,
   })
})
