export const up = function(knex) {
    return knex.schema.createTable("cards", (table) => {
        table.increments("id").primary(); // Primary key
        table.integer("userId").unique().unsigned().notNullable(); // Foreign key to `user` table
        table.string('cardNumber', 20).notNullable().unique(); // Unique 16-digit card number
        table.string('cardHolderName', 50).notNullable(); // Card holder name with max length of 100
        table.date('expiryDate').notNullable(); // Card expiry date
        table.string('cvv', 6).notNullable(); // CVV with max length of 4

        table.foreign("userId").references("id").inTable("user").onDelete("CASCADE");
        // table.foreign("userId").references("id").inTable("customer").onDelete("CASCADE");

    });
};
//changes successfully updated

export const down = function(knex) {
    return knex.schema.dropTableIfExists("cards");
};
