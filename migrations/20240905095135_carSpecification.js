/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return knex.schema.createTable("carSpecification", (table) => {
        table.increments("id").primary(); 
        table.string("pricePerDay").notNullable();
        table.enum("transmission",["automatic","Manual","Hybrid"]).notNullable(),
        table.enum ("fuelType" , ["petrol", "Diesel" , "Hybrid"]).notNullable(),
        table.integer("seatingCapacity").notNullable();
        table.string("mileage").notNullable(),
        table.string("color").notNullable(),
        table.text("engineCondition").notNullable(),
        table.integer("odometerReading").notNullable(),
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
