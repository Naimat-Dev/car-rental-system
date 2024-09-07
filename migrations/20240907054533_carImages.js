/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return knex.schema.createTable('carImages', function(table) {
        table.increments('id').primary(); 
        table.integer('carId').unsigned().notNullable(); 
        
        table.string('imageUrl', 255).notNullable(); 
        
        table.boolean('isPrimary').defaultTo(false); 

        table.foreign('carId').references('id').inTable('cars').onDelete('CASCADE');
        
        table.timestamps(true, true); 
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
    return knex.schema.dropTableIfExists('carImages');
};
