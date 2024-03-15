/* eslint-disable no-unused-vars */
export const handler = async (event, context) => {
  const res = await import('../../data/cities.json');
  const { cities } = res.default;
  return {
    statusCode: 200,
    body: JSON.stringify(cities),
  };
};
