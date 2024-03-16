/* eslint-disable no-unused-vars */

import fs from 'fs';
const chars = 'abcdefghij0123456789klmnopqrst0123456789uvwxyz012345';

export const handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }
  const cities = JSON.parse(
    fs.readFileSync('./data/cities.json', 'utf8')
  ).cities;
  console.log(cities);
  const id = Array.from({ length: 6 }, () =>
    chars.charAt(Math.floor(Math.random() * chars.length))
  ).join('');

  try {
    const city = JSON.parse(event.body);
    const newCity = {
      id,
      ...city,
    };
    cities.push(newCity);
    fs.writeFileSync('./data/cities.json', JSON.stringify({ cities }));
    return {
      statusCode: 200,
      body: JSON.stringify(newCity),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err.message,
    };
  }
};
