const { table } = require('./utils/airtable');

module.exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ err: 'That method is not allowed' }),
    };
  }

  const { score, name } = JSON.parse(event.body);
  if (typeof score === 'undefined' || !name) {
    return {
      statusCode: 405,
      body: JSON.stringify({ err: 'Bad request' }),
    };
  }

  try {
    const records = await table
      .select({
        sort: [{ field: 'score', direction: 'desc' }],
      })
      .firstPage();

    // Formatted records in order of scores
    const formattedRecords = records.map((record) => ({
      id: record.id,
      fields: record.fields,
    }));

    const lowestRecord = formattedRecords[formattedRecords.length - 1];
    console.log(lowestRecord, score);
    if (
      typeof lowestRecord.fields.score === 'undefined' ||
      score > lowestRecord.fields.score
    ) {
      const updatedRecord = {
        id: lowestRecord.id,
        fields: {
          name,
          score,
        },
      };

      await table.update([updatedRecord]);
      return {
        statusCode: 200,
        body: JSON.stringify(updatedRecord),
      };
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify({}),
      };
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        err: 'Failed to save score in Airtable'
      }),
    };
  }
};
