/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export const up = async function (knex) {
    await knex.schema.createTable('customer_address', (table) => {
       table.increments('id').primary()
       table.integer('customerId').unsigned().notNullable().unique()
       table.string('address', 255).notNullable()
       table.string('city', 50).notNullable()
       table.string('state', 20).notNullable()
       table.string('zipCode', 5).notNullable()
       table.string('country', 30).notNullable()
 
       table
          .foreign('customerId')
          .references('id')
          .inTable('customers')
          .onDelete('CASCADE')
 
       table.timestamps(true, true)
    })
 }
 
 /**
  * @param { import("knex").Knex } knex
  * @returns { Promise<void> }
  */
 export const down = async function (knex) {
    await knex.schema.dropTableIfExists('customer_address')
 }
 