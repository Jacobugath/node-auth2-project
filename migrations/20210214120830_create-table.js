
exports.up = function(knex) {
    return knex.schema.createTable('users', tbl => {
        tbl.increments();
        tbl.text('username', 128).unique()
        tbl.text('password', 128)
        tbl.text('department', 128)
       
    })};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
};
