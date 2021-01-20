const insertBuilder = (resultsRaw, table = 'TABLE') => {
  if (!resultsRaw.length) {
    throw 'Not found';
  }
  const keys = Object.keys(resultsRaw[0]);
  const values = builderInsertValues(resultsRaw);
  const header = `-- ***** ${table} *****`;
  return `\n\n${header}\n\nINSERT INTO ${table} (${keys.join(
    ','
  )}) \nVALUES ${values}`;
};

const builderInsertValues = (resultsRaw) => {
  let multipleValues = '';
  for (const resultRaw of resultsRaw) {
    const valuesRaw = Object.values(resultRaw);
    const values = valuesRaw.map((valueRaw) => {
      if (valueRaw instanceof Date) {
        return `'${valueRaw.toISOString().slice(0, 19).replace('T', ' ')}'`;
      } else if (typeof valueRaw === 'string') {
        return `'${valueRaw}'`;
      } else if (!valueRaw && typeof valueRaw === 'object') {
        return 'null';
      } else {
        return valueRaw;
      }
    });
    multipleValues += `(${values.join(',')}),`;
  }
  multipleValues = `${multipleValues.slice(0, -1)};`;
  return multipleValues;
};

module.exports = insertBuilder;
