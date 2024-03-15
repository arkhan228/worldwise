/* eslint-disable no-unused-vars */
export const handler = async (event, context) => {
  const { id } = event.queryStringParameters;
  const res = await import('../../data/cities.json');
  const { cities } = res.default;
  const city = cities.find(city => city.id === id);
  return {
    statusCode: 200,
    body: JSON.stringify(city),
  };
};
