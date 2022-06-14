const Airtable = require('airtable');
require('dotenv').config();

Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY,
});

const base = Airtable.base(process.env.AIRTABLE_BASE);
const table = base.table(process.env.AIRTABLE_TABLE);

const getHighScores = async (filter = false) => {
  const queryOptions = {
    sort: [{ field: 'score', direction: 'desc' }]
  };

  if (filter) {
    queryOptions.filterByFormula = `AND(name != "", score > 0)`;
  }

  const records = await table.select(queryOptions).firstPage();
  return records.map((record) => ({
    id: record.id,
    fields: record.fields,
  }));
};

module.exports = {
  base,
  table,
  getHighScores,
};
