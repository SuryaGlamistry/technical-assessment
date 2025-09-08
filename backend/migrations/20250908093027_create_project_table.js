export async function up(knex) {
  return knex.schema.createTable("project", (table) => {
    table.increments("id").primary();
    table.string("job_id").notNullable();
    table.string("job_title").notNullable();
    table.text("job_description");
    table.timestamps(true, true);
  });
}

export async function down(knex) {
  return knex.schema.dropTableIfExists("project");
}
