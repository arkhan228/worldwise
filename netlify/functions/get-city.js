/* eslint-disable no-unused-vars */

import { cities } from '../../data/cities.json';
export const handler = async (event, context) => {
  const { id } = event.queryStringParameters;
  const city = cities.find(city => city.id === id);
  return {
    statusCode: 200,
    body: JSON.stringify(city),
  };
};
