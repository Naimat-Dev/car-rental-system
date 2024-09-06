/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return knex.schema.createTable("car", (table) => {
        table.increments("id").primary().unique(); //id column with auto-incrementing primary key
        table.string("name").notNullable();
        table.integer("brandId").notNullable();
        table.string("modelYear").notNullable();
        table.string("registrationNumber").notNullable().unique();
        table.string("registrationCity").notNullable();
        table.text("description") ;
        table.text("carDocument").notNullable().unique();
        table.integer("carTypeId").notNullable();
        table.timestamps(true, true); //created_at and updated_at columns with type timestamp
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export  const down = function(knex) {
    return knex.schema.dropTableIfExists("car");
};
  
