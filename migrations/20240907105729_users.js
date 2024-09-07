export const up = function(knex) {
    return knex.schema.createTable("users", (table) => {
        table.increments("id").primary();
        table.string("email", 50).notNullable().unique();
        table.string("name", 50).notNullable();
        table.string("phoneNumber", 30).notNullable().unique();
        table.enu("status", ["active", "inactive"]).notNullable().defaultTo("inactive");
        table.date("registrationDate").notNullable();
        table.string("image").nullable();
        table.string("cnic", 20).nullable().unique();
        table.enu("role", ["admin", "user"]).defaultTo("user")
        table.string("password", 70).notNullable
        table.date("passwordChangedAt").nullable(); 
        table.string("passwordResetToken").nullable(); 
        table.date("passwordResetExpires").nullable(); 
        table.timestamps(true,true);
    });
};
//changes successfully updated

export const down = function(knex) {
    return knex.schema.dropTableIfExists("users");
};


