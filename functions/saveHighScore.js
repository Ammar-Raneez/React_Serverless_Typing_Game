const { table, getHighScores } = require('./utils/airtable');
const { getAccessTokenFromHeaders } = require('./utils/auth');

module.exports.handler = async (event) => {
  const token = getAccessTokenFromHeaders(event.headers);
  if (!token) {
    return {
      statusCode: 401,
      body: JSON.stringify({ err: 'User is not logged in.' }),
    };
  }

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
    // Formatted records in order of scores
    const formattedRecords = await getHighScores();
    const lowestRecord = formattedRecords[formattedRecords.length - 1];
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
