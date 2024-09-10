/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export const up = function(knex) {
    return knex.schema.createTable("carSpecifications", (table) => {

        table.increments('id').primary().unique(); 

        table.integer('carId').unsigned().notNullable(); 
        
        table.decimal('pricePerDay').notNullable(); 
        
        table.enu('transmission', ['manual', 'automatic']).notNullable().defaultTo("manual"); 
        
        table.enu('fuelType', ['petrol', 'diesel', 'electric', 'hybrid']).notNullable().defaultTo("petrol"); 
        
        table.integer('seatingCapacity').notNullable(); 
        
        table.decimal('minMileage').notNullable(); 

        table.decimal('maxMileage').notNullable();  
        
        table.string('engineCapacity').notNullable(); 
        
        table.string('color', 10).notNullable(); 
        
        table.string('engineCondition').notNullable(); 
        
        table.decimal('odometerReading').notNullable(); 
        
      // If a record in the 'cars' table is deleted, the associated records in 'carDetails' will also be deleted (CASCADE)
        table.foreign('carId').references('id').inTable('cars').onDelete('CASCADE'); 
        
        table.timestamps(true, true); 
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
   return knex.schema.dropTableIfExists('carSpecification')
}
