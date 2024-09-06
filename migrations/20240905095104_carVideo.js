/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return knex.schema.createTable("carVideo", (table) => {
        table.increments("id").primary(); //id column with auto-incrementing primary key
        table.integer("carID").notNullable();
        table.text("videoUrl").notNullable();
        table.timestamps(true, true); //created_at and updated_at columns with type timestamp
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
    return knex.schema.dropTableIfExists("carVideo");
};
