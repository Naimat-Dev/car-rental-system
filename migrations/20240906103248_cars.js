/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
   return knex.schema.createTable('cars', (table) => {
      table.increments('id').primary() // Create an auto-incrementing 'id' column and set it as the primary key

      table.string('name', 10).notNullable() // Create a 'name' column with a maximum length of 10 characters, which cannot be null

      table.integer('brandId').unsigned().notNullable() // Create an 'brandId' column for storing integer values, cannot be null, and unsigned (i.e., only positive values)

      table.integer('model', 20).notNullable() // Create a 'model' column for storing integer values with a length of 20 characters (note: integer length doesn't apply, this may be a conceptual error), cannot be null

      table.integer('cartypeId').unsigned().notNullable() // Create a 'cartypeId' column for storing integer values, cannot be null, and unsigned

      table.string('registrationCity', 30).notNullable() // Create a 'registrationcity' column with a maximum length of 30 characters, which cannot be null

      table.string('registrationNumber', 20).notNullable().unique() // Create a 'registrationNumber' column with a maximum length of 20 characters, which cannot be null and must be unique

      table.text('description', 255).nullable() // Create a 'description' column that can store longer text up to 255 characters, which can be null

      table
         .enu('carDocuments', ['registration', 'unregistered'])
         .notNullable()
         .defaultTo('registration') // Create an 'carDocuments' column with restricted values ('registration' or 'unregistered'), cannot be null, and defaults to 'registration'

      table
         .enu('assembly', ['imported', 'local'])
         .notNullable()
         .defaultTo('local') // Create an 'assembly' column with restricted values ('imported' or 'local'), cannot be null, and defaults to 'local'

      // Define foreign key relationships:
      table
         .foreign('brandId')
         .references('id')
         .inTable('brands')
         .onDelete('CASCADE') // Reference 'id' in the 'brands' table with CASCADE delete rule

      table
         .foreign('cartypeId')
         .references('id')
         .inTable('carTypes')
         .onDelete('CASCADE') // Reference 'id' in the 'carTypes' table with CASCADE delete rule

      table.timestamps(true, true) // Add 'created_at' and 'updated_at' timestamp columns, with automatic handling of their values
   })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
   return knex.schema.dropTableIfExists('cars')
}
