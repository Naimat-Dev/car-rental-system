export const up = function (knex) {
    return knex.schema.createTable("userAddress", (table) => {
        table.increments("id").primary(); // Primary key
        table.integer("userId").unique().unsigned().notNullable(); // Foreign key to `user` table
        table.string("address", 255).notNullable(); // Address field with max length of 255
        table.string("city", 50).notNullable(); // City field with max length of 50
        table.string("zipCode", 10).notNullable(); // Zip code field with max length of 10
        table.string("state", 50).notNullable(); // State field with max length of 50

        // Foreign key constraint
        table.foreign("userId").references("id").inTable("users").onDelete("CASCADE");
        table.timestamps(true, true);

    });
};
//changes successfully updated
export const down = function (knex) {
    return knex.schema.dropTableIfExists("userAddress");
};









