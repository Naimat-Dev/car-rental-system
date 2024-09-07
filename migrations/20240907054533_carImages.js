/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return knex.schema.createTable('carImages', function(table) {
        table.increments('id').primary(); // Create an auto-incrementing 'id' column and set it as the primary key

        table.integer('carId').unsigned().notNullable(); // Create a 'carId' column for storing integer values, which cannot be null, and is unsigned (i.e., only positive values)
        
        // Define the columns with their respective constraints and default values:
        table.string('imageUrl', 255).notNullable(); // Create an 'imageUrl' column to store the URL of the image; cannot be null, with a maximum length of 255 characters
        
        table.boolean('isPrimary').defaultTo(false); // Create an 'isPrimary' column to indicate whether the image is the primary one; defaults to false
        
        // Define a foreign key constraint linking 'carId' to the 'id' column in the 'cars' table
        table.foreign('carId').references('id').inTable('cars').onDelete('CASCADE'); // If a record in the 'cars' table is deleted, the associated records in 'carImages' will also be deleted (CASCADE)
        
        table.timestamps(true, true); // Add 'created_at' and 'updated_at' timestamp columns; automatically managed to track when records are created and updated
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
    return knex.schema.dropTableIfExists('carImages');
};
