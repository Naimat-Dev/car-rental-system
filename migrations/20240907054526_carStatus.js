/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export const up = function (knex) {
   return knex.schema.createTable('carStatus', function (table) {

      table.increments('id').primary() 

      table.integer('carId').unsigned().notNullable() 

      table.string('location', 255).notNullable() 

      table
         .enu('availabilityStatus', ['available', 'unavailable', 'maintenance'])
         .notNullable()
         .defaultTo('available') 

      table.string('insuranceDetail', 255).nullable() 

      table
         .enu('fuelPolicy', ['full-to-full', 'same-to-same'])
         .notNullable()
         .defaultTo('full-to-full') 

      table.string('lastServicedDate', 50) 
      // If a record in the 'cars' table is deleted, the associated records in 'carStatus' will also be deleted (CASCADE)
      table
         .foreign('carId')
         .references('id')
         .inTable('cars')
         .onDelete('CASCADE') 

      table.timestamps(true, true) 
   })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
   return knex.schema.dropTableIfExists('carStatus')
}
