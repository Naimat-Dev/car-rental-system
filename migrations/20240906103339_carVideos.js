/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return knex.schema.createTable('carVideos', (table) => {
        table.increments('id').primary();
        table.integer('carId').unsigned().notNullable();
        table.text('videourl', 255).notNullable();
    
        table.foreign('carId').references('id').inTable('cars').onDelete('CASCADE');
        table.timestamps(true, true);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
    return knex.schema.dropTableIfExists('carVideos');
};
