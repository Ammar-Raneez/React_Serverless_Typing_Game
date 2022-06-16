const { table, getHighScores } = require('./utils/airtable');
const { getAccessTokenFromHeaders, validateAccessToken } = require('./utils/auth');

module.exports.handler = async (event) => {
  const token = getAccessTokenFromHeaders(event.headers);
  const user = await validateAccessToken(token);
  if (!user) {
    return {
      statusCode: 403,
      body: JSON.stringify({ err: 'Unauthorized' }),
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ err: 'That method is not allowed' }),
    };
  }

  const { score } = JSON.parse(event.body);
  const name = user['https://react-netlify-typing-game/username'];
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
