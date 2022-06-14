exports.handler = async (event, context, callback) => {
  console.log(event, context, callback);

  return {
    statusCode: 200,
    body: JSON.stringify({
      msg: 'Hello world`',
    }),
  };
};
