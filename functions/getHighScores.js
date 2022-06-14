const Airtable = require('airtable');
require('dotenv').config();

Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY,
});

const base = Airtable.base(process.env.AIRTABLE_BASE);
const table = base.table(process.env.AIRTABLE_TABLE);

module.exports.handler = async (event) => {
  try {
    const records = await table.select({ fields: ['name'] }).firstPage();
    const formattedRecords = records.map((record) => ({
      id: record.id,
      fields: record.fields,
    }))

    return {
      statusCode: 200,
      body: JSON.stringify(formattedRecords),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        err: 'Failed to query records in Airtable'
      }),
    };
  }
};
