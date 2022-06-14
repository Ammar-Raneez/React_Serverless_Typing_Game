const { table } = require('./utils/airtable');

module.exports.handler = async () => {
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
