const selectBuilder = (tables) => {
  let sqlSelect = ``;
  for (const table of tables) {
    sqlSelect += `SELECT 
      distinct ${table}.*    
      FROM
        users
      LEFT JOIN
        user_types ON users.user_type_id = user_types.id; `;
  }
  return sqlSelect;
};

module.exports = selectBuilder;
