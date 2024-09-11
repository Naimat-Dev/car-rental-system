export const up = function (knex) {
   return knex.schema.createTable('cards', (table) => {
      table.increments('id').primary()
      table.integer('ownerId').unsigned().unique().notNullable()
      table.enu('ownerType', ['customer', 'user']).defaultTo('customer')
      table.string('cardHolderName', 50).notNullable()
      table.string('cardNumber').notNullable()
      table.date('expiryDate').notNullable()
      table.string('cvv', 6).notNullable().unique()
      table.text('billingAddress').nullable()

      table.timestamps(true, true)
   })
}

export const down = function (knex) {
   return knex.schema.dropTableIfExists('cards')
}
