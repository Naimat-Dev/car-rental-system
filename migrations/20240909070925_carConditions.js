/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export const up = async function (knex) {
    await knex.schema.createTable("carConditions", (table) => {
      table.increments("id").primary();
      table.integer("carId").unsigned().notNullable();
      table
        .enu("conditionType", ["initial", "final"])
        .notNullable()
        .defaultTo("initial");
      table.jsonb("imageUrls").defaultTo("[]");
      table.jsonb("videoUrls").defaultTo("[]");
  
      table.foreign("carId").references("id").inTable("cars").onDelete("CASCADE");
  
      table.timestamps(true, true);
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export const down = async function (knex) {
    await knex.schema.dropTableIfExists("carConditions");
  };
  