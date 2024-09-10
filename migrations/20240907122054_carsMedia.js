/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export const up = function(knex) {
    return knex.schema.createTable('carsMedia', (table) => {

        table.increments('id').primary() 

        table.integer('carId').unsigned().notNullable().unique(); 

         // JSONB field for image URLs (array)
        table.jsonb('imageUrls').defaultTo('[]');

        // JSONB field for video URLs (array)
        table.jsonb('videoUrls').defaultTo('[]'); 

         // If a record in the 'cars' table is deleted, the associated records in 'carsMedia' will also be deleted (CASCADE)
        table.foreign('carId').references('id').inTable('cars').onDelete('CASCADE'); // Foreign key constraint
        
        table.timestamps(true, true);
    });
    
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
   return knex.schema.dropTable('carsMedia')
}
