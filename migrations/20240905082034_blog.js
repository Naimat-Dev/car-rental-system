/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
	//Create a table called "blog" with the following columns: id, title, content, author, created_at, updated_at
	return knex.schema.createTable("blog", (table) => {
		table.increments("id").primary(); //id column with auto-incrementing primary key
		table.string("title").notNullable(); //title column with type string
		table.text("content").notNullable(); //content column with type text
		table.string("author").notNullable(); //author column with type string
		table.timestamps(true, true); //created_at and updated_at columns with type timestamp
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
	// Drop the "blog" table if it exists
	return knex.schema.dropTableIfExists("blog");
};
