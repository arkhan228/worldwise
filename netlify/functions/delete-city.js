/* eslint-disable no-unused-vars */
import fs from 'fs';
import { cities } from '../../data/cities.json';
export const handler = async (event, context) => {
  if (event.httpMethod !== 'DELETE') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }
  const { id } = event.queryStringParameters;
  const newCities = cities.filter(city => city.id !== id);
  fs.writeFileSync('./data/cities.json', JSON.stringify({ cities: newCities }));
  return {
    statusCode: 200,
    body: JSON.stringify(newCities),
  };
};
