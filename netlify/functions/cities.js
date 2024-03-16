/* eslint-disable no-unused-vars */

import { cities } from '../../data/cities.json';
export const handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify(cities),
  };
};

// const res = await import('../../data/cities.json');
// const { cities } = res.default;
