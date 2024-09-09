/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
   return knex.schema.createTable('carSpecifications', (table) => {
      table.increments('id').primary() // Create an auto-incrementing 'id' column and set it as the primary key

      table.integer('carId').unsigned().notNullable() // Create a 'carId' column for storing integer values, which cannot be null, and is unsigned (i.e., only positive values)

      // Define the columns with their respective constraints and default values:
      table.decimal('pricePerDay').notNullable() // Create a 'pricePerDay' column to store the price per day of renting the car; cannot be null

      table
         .enu('transmission', ['manual', 'automatic'])
         .notNullable()
         .defaultTo('manual') // Create an 'transmission' column with enum values 'manual' or 'automatic'; default value is 'manual'

      table
         .enu('fuelType', ['petrol', 'diesel', 'electric', 'hybrid'])
         .notNullable()
         .defaultTo('petrol') // Create a 'fuelType' column with enum values 'petrol', 'diesel', 'electric', or 'hybrid'; default value is 'petrol'

      table.integer('seatingCapacity').notNullable() // Create a 'seatingCapacity' column to store the number of seats in the car; cannot be null

      table
         .enu('mileage', ['low', 'medium', 'high'])
         .notNullable()
         .defaultTo('low') // Create a 'mileage' column with enum values 'low', 'medium', or 'high'; default value is 'low'

      table.string('engineCapacity').notNullable() // Create an 'engineCapacity' column to store the engine capacity of the car; cannot be null

      table.string('color', 10).notNullable() // Create a 'color' column to store the color of the car, limited to 10 characters; cannot be null

      table.string('engineCondition').notNullable() // Create an 'enginecondition' column to store the condition of the engine; cannot be null

      table.decimal('odometerReading').notNullable() // Create an 'odometerReading' column to store the car's odometer reading; cannot be null

      // Define a foreign key constraint linking 'carId' to the 'id' column in the 'cars' table
      table
         .foreign('carId')
         .references('id')
         .inTable('cars')
         .onDelete('CASCADE') // If a record in the 'cars' table is deleted, the associated records in 'carDetails' will also be deleted (CASCADE)

      table.timestamps(true, true) // Add 'created_at' and 'updated_at' timestamp columns; automatically managed to track when records are created and updated
   })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
   return knex.schema.dropTableIfExists('carSpecification')
}
