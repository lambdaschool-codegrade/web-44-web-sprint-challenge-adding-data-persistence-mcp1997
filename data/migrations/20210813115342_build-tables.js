
exports.up = async function(knex) {
  await knex.schema
    .createTable('projects', (tbl) => {
      tbl.increments('project_id')
      tbl.string('project_name', 72).notNullable()
      tbl.string('project_description', 256)
      tbl.boolean('project_completed').defaultTo(false)
    })
    .createTable('resources', (tbl) => {
      tbl.increments('resource_id')
      tbl.string('resource_name', 72).unique().notNullable()
      tbl.string('resource_description', 256)
    })
    .createTable('tasks', (tbl) => {
      tbl.increments('task_id')
      tbl.string('task_description', 256).notNullable()
      tbl.string('task_notes', 256)
      tbl.boolean('task_completed').defaultTo(false)
      tbl.integer('project_id')
        .unsigned()
        .notNullable()
        .references('project_id').inTable('projects')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    })
    .createTable('project_resources', (tbl) => {
      tbl.increments('project_resource_id')
      tbl.integer('project_id')
        .unsigned()
        .notNullable()
        .references('project_id').inTable('projects')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      tbl.integer('resource_id')
        .unsigned()
        .notNullable()
        .references('resource_id').inTable('resources')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('project_resources')
    .dropTableIfExists('tasks')
    .dropTableIfExists('resources')
    .dropTableIfExists('projects')
};
