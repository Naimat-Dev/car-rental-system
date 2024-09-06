/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return knex.schema.createTable("carSpecification", (table) => {
        table.increments('id').primary();
        table.integer('carId').unsigned().notNullable(); // Foreign key to Car table
        table.integer('pricePerDay').notNullable();
        
        table.enu('transmission', ['manual', 'automatic']).notNullable().defaultTo("manual"); // Enum for transmission
        
        table.enu('fuelType', ['petrol', 'diesel', 'electric', 'hybrid']).notNullable().defaultTo("petrol"); // Enum for fuel type
        table.integer('seatingCapacity').notNullable();
        table.enu('mileage', ['low', 'medium', 'high']).notNullable().defaultTo("low"); // Enum for mileage
        table.string('engineCapacity').notNullable();
        table.string('color', 10).notNullable(); // Limiting color to 10 characters
        table.string('enginecondition').notNullable();
        table.decimal('odometerReading').notNullable();
    
        table.foreign('carId').references('id').inTable('cars').onDelete('CASCADE');
        table.timestamps(true, true);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
    return knex.schema.dropTableIfExists("carSpecification");
};
