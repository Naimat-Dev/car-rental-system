/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export const up = async function (knex) {
    await knex.schema.createTable("bookings", (table) => {
      table.increments("id").primary();
      table.integer("customerId").unsigned().notNullable();
      table.date("rentalStartDate").notNullable();
      table.date("rentalEndDate").notNullable();
      table.string("totalDays").notNullable();
      table.decimal('initialMilesage').notNullable();
      table.decimal("totalPrice").notNullable();
  
      table
        .foreign("customerId")
        .references("id")
        .inTable("customers")
        .onDelete("CASCADE");
  
      table
      .foreign("carId")
      .references("id")
      .inTable("cars")
      .onDelete("CASCADE");
  
      table.timestamps(true, true);
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export const down = async function (knex) {
    await knex.schema.dropTableIfExists("bookings");
  };
  