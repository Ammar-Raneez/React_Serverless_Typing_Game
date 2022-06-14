const { getHighScores } = require('./utils/airtable');

module.exports.handler = async () => {
  try {
    const formattedRecords = await getHighScores(true);
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
