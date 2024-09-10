export const up = function (knex) {
    return knex.schema.createTable("userAddress", (table) => {
        table.increments("id").primary(); // Primary key
        table.integer("userId").unique().unsigned().notNullable(); 
        table.string("address", 255).notNullable(); 
        table.string("city", 50).notNullable(); 
        table.string("zipCode", 10).notNullable(); 
        table.string("state", 50).notNullable(); 

        // Foreign key constraint
        table.foreign("userId").references("id").inTable("users").onDelete("CASCADE");
        table.timestamps(true, true);

    });
};
//changes successfully updated
export const down = function (knex) {
    return knex.schema.dropTableIfExists("userAddress");
};









