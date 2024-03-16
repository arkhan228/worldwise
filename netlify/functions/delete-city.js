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
  try {
    const { id } = event.queryStringParameters;
    const newCities = cities.filter(city => city.id !== id);
    fs.writeFile(
      './data/cities.json',
      JSON.stringify({ cities: newCities }),
      err => {
        if (err) throw new Error(err.message);
      }
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
