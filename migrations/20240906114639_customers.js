/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function (knex) {
    await knex.schema.createTable("customers", (table) => {
      table.increments("id").primary();
      table.string("firstName", 50).notNullable();
      table.string("lastName", 50).notNullable();
      table.string("password", 128).notNullable();
      table.string("cnic", 20).unique().notNullable();
      table.string("phoneNumber", 20).notNullable().unique();
      table.date("dateOfBirth").notNullable();
      table.string("imageUrl", 255).notNullable(); 
      table
        .enu("status", ["active", "inactive"])
        .notNullable()
        .defaultTo("inactive");
  
      table.timestamps(true, true);
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export const down = async function (knex) {
    await knex.schema.dropTableIfExists("customers");
  };
  