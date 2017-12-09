const tables = (state, action) => {
  return [
    { id: 1, label: 'FINA.CTXABSTRACTDOSSIER', fields: [1, 2, 4] },
    { id: 2, label: 'FINA.CTXEVENEMENT', fields: [2, 3] },
    { id: 3, label: 'FINA.CTXPOUDOSSIER', fields: [3, 4] },
  ]
};

export const getFieldsToTables = (state) => {
  let result = {};
  const tables = getTables(state);
  tables.forEach((table) => {
    table.fields.forEach((fieldId) => {
      let tablesForField = result[fieldId];
      if (tablesForField == undefined) {
        tablesForField = [];
        result[fieldId] = tablesForField;
      }
      tablesForField.push(table);
    });
  });
  return result;
}

export const getTableIdToTables = (state) => {
  let result = {};
  const tables = getTables(state);
  tables.forEach((table) => {
    result[table.id] = table;
  });
  return result;
}

export const getTables = (state) => {
  return state;
}

export const getTable = (state, id) => {
  return state.find((table) => table.id == id);
}

export default tables;
