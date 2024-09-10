/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
   return knex.schema.createTable('brands', (table) => {
      
      table.increments('id').primary()

      table.string('name', 30).notNullable().unique()

      table.timestamps(true, true)
   })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
   return knex.schema.dropTableIfExists('brands')
}
