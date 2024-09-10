/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export const up = function (knex) {
   return knex.schema.createTable('carStatus', function (table) {
      table.increments('id').primary() // Create an auto-incrementing 'id' column and set it as the primary key

      table.integer('carId').unsigned().notNullable() // Create a 'carId' column for storing integer values, which cannot be null, and is unsigned (i.e., only positive values)

      // Define the columns with their respective constraints and default values:
      table.string('location', 255).notNullable() // Create a 'location' column to store the location of the car; cannot be null, with a maximum length of 255 characters

      table
         .enu('availabilityStatus', ['available', 'unavailable', 'maintenance'])
         .notNullable()
         .defaultTo('available') // Create an 'availabilityStatus' column with enum values 'available', 'unavailable', or 'maintenance'; default value is 'available'

      table.string('insuranceDetail', 255).nullable() // Create an 'insuranceDetail' column to store insurance details; can be null, with a maximum length of 255 characters

      table
         .enu('fuelPolicy', ['full-to-full', 'same-to-same'])
         .notNullable()
         .defaultTo('full-to-full') // Create a 'fuelPolicy' column with enum values 'full-to-full' or 'same-to-same'; default value is 'full-to-full'

      table.string('lastServicedDate', 50) // Create a 'lastServicedDate' column to store the date of the last service; cannot be null, with a maximum length of 50 characters

      // Define a foreign key constraint linking 'carId' to the 'id' column in the 'cars' table
      table
         .foreign('carId')
         .references('id')
         .inTable('cars')
         .onDelete('CASCADE') // If a record in the 'cars' table is deleted, the associated records in 'carStatus' will also be deleted (CASCADE)

      table.timestamps(true, true) // Add 'created_at' and 'updated_at' timestamp columns; automatically managed to track when records are created and updated
   })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
   return knex.schema.dropTableIfExists('carStatus')
}
