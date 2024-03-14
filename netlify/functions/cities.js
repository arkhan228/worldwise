exports.handler = async function (event, context) {
  const cities = require('../../src/data/cities.json');
  return {
    statusCode: 200,
    body: JSON.stringify(cities),
  };
};
