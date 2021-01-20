const selectBuilder = (tables, ids) => {
  let sqlSelect = ``;
  for (const table of tables) {
    sqlSelect += `SELECT 
        distinct ${table.alias}.*    
      FROM
        users
      LEFT JOIN
        user_types ON users.user_type_id = user_types.id
      WHERE
      ${table.alias}.id IN (${ids})`;
  }
  return sqlSelect;
};

module.exports = selectBuilder;
