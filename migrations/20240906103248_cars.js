/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return knex.schema.createTable("cars", (table) => {
        table.increments('id').primary();
        table.string('name', 10).notNullable();
        table.integer('brandId').unsigned().notNullable();
        table.integer('model', 20).notNullable();
        table.integer('cartypeId').unsigned().notNullable();
        table.string('registrationcity', 30).notNullable();
        table.string('registrationNumber', 20).notNullable().unique();
        table.text('description', 255).nullable();
    
        table.enu('carDocuments', ['registration', 'unregistered']).notNullable().defaultTo("registration");
    
        table.enu('assembly', ['imported', 'local']).notNullable().defaultTo("local");
    
        table.foreign('brandId').references('id').inTable('brands').onDelete('CASCADE');
        table.foreign('cartypeId').references('id').inTable('carTypes').onDelete('CASCADE');
        table.timestamps(true, true);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export  const down = function(knex) {
    return knex.schema.dropTableIfExists("cars");
};
  
