/* eslint-disable no-unused-vars */
import fs from 'fs';
export const handler = async (event, context) => {
  if (event.httpMethod !== 'DELETE') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }
  const { id } = event.queryStringParameters;
  const res = await import('../../data/cities.json');
  const { cities } = res.default;
  const newCities = cities.filter(city => city.id !== id);
  fs.writeFileSync('./data/cities.json', JSON.stringify({ cities: newCities }));
  return {
    statusCode: 200,
    body: JSON.stringify(newCities),
  };
};
