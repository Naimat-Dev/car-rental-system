/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export const up = async function (knex) {
   await knex.schema.createTable('transactions', (table) => {
      table.increments('id').primary()
      table.integer('customerId').unsigned().notNullable()
      table.integer('bookingId').unsigned().notNullable().unique()
      table.integer('ownerId').unsigned().notNullable()
      table.decimal('additionalCharges').unsigned().defaultTo(0)
      table.decimal('rentalCharges').unsigned().defaultTo(0)
      table.decimal('totalAmount').unsigned().defaultTo(0)
      table
         .enu('status', ['paid', 'pending'])
         .notNullable()
         .defaultTo('pending')
      table.enu('paymentMethod', ['creditCard', 'debitCard']).notNullable()
      table.date('paymentDate').notNullable()

      table
         .foreign('bookingId')
         .references('id')
         .inTable('car_bookings')
         .onDelete('CASCADE')

      table.foreign('customerId').references('id').inTable('customers')

      table.foreign('ownerId').references('id').inTable('users')

      table.timestamps(true, true)
   })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function (knex) {
   await knex.schema.dropTableIfExists('transactions')
}
