/* eslint-disable no-unused-vars */
import fs from 'fs';
export const handler = async (event, context) => {
  if (event.httpMethod !== 'DELETE') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }
  try {
    const { cities } = JSON.parse(fs.readFileSync('./data/cities.json'));
    const { id } = event.queryStringParameters;
    const newCities = cities.filter(city => city.id !== id);
    fs.writeFileSync(
      './data/cities.json',
      JSON.stringify({ cities: newCities })
    );
    return {
      statusCode: 200,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err.message,
    };
  }
};
