/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export const up = function(knex) {
    return knex.schema.createTable('carsMedia', (table) => {
        table.increments('id').primary() // Auto-incrementing unique ID
        table.integer('carId').unsigned().notNullable().unique(); // Integer field for carId
        table.jsonb('imageUrls').defaultTo('[]'); // JSONB field for image URLs (array)
        table.jsonb('videoUrls').defaultTo('[]'); // JSONB field for video URLs (array)
        table.foreign('carId').references('id').inTable('cars').onDelete('CASCADE'); // Foreign key constraint
        table.timestamps(true, true); // Adds created_at and updated_at with automatic updates
    });
    
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
   return knex.schema.dropTable('carsMedia')
}
