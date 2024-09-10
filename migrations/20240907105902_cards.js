export const up = function (knex) {
   return knex.schema.createTable('cards', (table) => {
      table.increments('id').primary()
      // Foreign key ID (either userId or customerId)
      table.integer('ownerId').unsigned().unique().notNullable()
      // Either 'user' or 'customer'
      table.enu('ownerType', ['customer', 'user']).defaultTo('customer')

      table.string('cardHolderName', 50).notNullable()
      table.string('cardNumber').notNullable()
      table.date('expiryDate').notNullable()
      table.string('cvv', 6).notNullable()
      table.text('billingAddress').nullable()

      table.timestamps(true, true)
   })
}

export const down = function (knex) {
   return knex.schema.dropTableIfExists('cards')
}
