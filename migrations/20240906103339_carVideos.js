/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return knex.schema.createTable('carVideos', (table) => {
        table.increments('id').primary(); // Create an auto-incrementing 'id' column and set it as the primary key

        table.integer('carId').unsigned().notNullable(); // Create an 'carId' column for storing integer values, which cannot be null, and is unsigned (i.e., only positive values)
        
        table.text('videourl', 255).notNullable(); // Create a 'videourl' column for storing longer text up to 255 characters, which cannot be null
        
        table.foreign('carId').references('id').inTable('cars').onDelete('CASCADE'); // Define a foreign key constraint that references the 'id' column in the 'cars' table; on delete, the associated records in 'carImages' will also be deleted (CASCADE)
        
        table.timestamps(true, true); // Add 'created_at' and 'updated_at' timestamp columns; automatically managed to track when records are created and updated
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
    return knex.schema.dropTableIfExists('carVideos');
};
