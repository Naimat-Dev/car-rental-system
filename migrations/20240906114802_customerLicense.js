/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */ 
export const up = async function (knex) {
    await knex.schema.createTable("customerLicense", (table) => {
      table.increments("id").primary();
      table.integer("customerId").unsigned().notNullable();
      table.string("drivingLicenseNumber", 30).notNullable().unique(); 
      table.date("licenseExpiryDate").notNullable(); 
  
      table
        .foreign("customerId")
        .references("id")
        .inTable("customers")
        .onDelete("CASCADE");
  
      table.timestamps(true, true);
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export const down = async function (knex) {
    await knex.schema.dropTableIfExists("customerLicense");
  };
  
  
  