/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return knex.schema.createTable('brands', (table) => {
        table.increments('id').primary(); // Create an auto-incrementing 'id' column and set it as the primary key

        table.string('name', 30).notNullable().unique(); // Create a 'name' column with a maximum length of 30 characters, which cannot be null and must be unique
        
        table.timestamps(true, true); // Add 'created_at' and 'updated_at' timestamp columns, with automatic handling of their values
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
    return knex.schema.dropTableIfExists('brands');
};
