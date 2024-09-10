/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
   return knex.schema.createTable('carsMedia', (table) => {
      table.increments('id').primary() // Auto-incrementing unique ID
      table.integer('carId').unsigned().notNullable() // Integer field for carId
      table.jsonb('imageUrls').defaultTo('[]') // JSONB field for image URLs (array)
      table.jsonb('videoUrls').defaultTo('[]') // JSONB field for video URLs (array)
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
   return knex.schema.dropTable('carsMedia')
}
