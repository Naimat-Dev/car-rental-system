export const up = function (knex) {
    return knex.schema.createTable('user_address', (table) => {
       table.increments('id').primary() 
       table.integer('userId').unique().unsigned().notNullable() 
       table.string('address', 255).notNullable() 
       table.string('city', 50).notNullable() 
       table.string('zipCode', 5).notNullable() 
       table.string('state', 50).notNullable() 
 
       table
          .foreign('userId')
          .references('id')
          .inTable('users')
          .onDelete('CASCADE')
 
       table.timestamps(true, true)
    })
 }
 
 export const down = function (knex) {
    return knex.schema.dropTableIfExists('user_address')
 }
 