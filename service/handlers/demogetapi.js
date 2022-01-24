'use strict';

const demogetapi = async (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
      value: context
    }),
  };
 
  callback(null, response);
};


module.exports = {
  demogetapi
}
