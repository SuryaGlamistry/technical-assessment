export function up(knex) {
  return knex.schema
    .createTable("projects", (table) => {
      table.increments("id").primary();
      table.string("job_id").unique();
      table.string("job_title").notNullable();
      table.text("job_description");
    })
    .createTable("skills", (table) => {
      table.increments("id").primary();
      table.string("skill_name").unique().notNullable();
    })
    .createTable("project_skills", (table) => {
      table.integer("project_id").unsigned().references("id").inTable("projects");
      table.integer("skill_id").unsigned().references("id").inTable("skills");
      table.primary(["project_id", "skill_id"]);
    })
    .createTable("applications", (table) => {
      table.increments("id").primary();
      table.integer("project_id").unsigned().references("id").inTable("projects");
      table.integer("candidate_id");
      table.enum("status", ["applied", "interviewed", "hired", "rejected"]);
    });
}

export function down(knex) {
  return knex.schema
    .dropTableIfExists("applications")
    .dropTableIfExists("project_skills")
    .dropTableIfExists("skills")
    .dropTableIfExists("projects");
}
