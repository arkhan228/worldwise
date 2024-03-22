/* eslint-disable no-unused-vars */

import { writeFileSync } from 'fs';
const chars = 'abcdefghij0123456789klmnopqrst0123456789uvwxyz012345';
import { cities } from '../../data/cities.json';
export const handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }
  try {
    const id = Array.from({ length: 6 }, () =>
      chars.charAt(Math.floor(Math.random() * chars.length))
    ).join('');

    const city = JSON.parse(event.body);
    const newCity = {
      id,
      ...city,
    };
    cities.push(newCity);
    writeFileSync('./data/cities.json', JSON.stringify({ cities }), err => {
      if (err) throw new Error(err);
    });
    return {
      statusCode: 200,
      body: JSON.stringify(newCity),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: err.message,
    };
  }
};

/* 

My worldwise application live on netlify
0 upvotes
Abdul · Lecture 240 · 59 minutes ago
I deployed the WorldWise application to Netlify, again, making the API work with Netlify functions, but this time around, it was really hard, especially the POST and DELETE requests. Thankfully, I made it after a lot work.

The map marker was also not working in deployment, even with CSS styles from leaflet so I got my own marker.

Here's the git repo if anyone want to take a lot at how Netlify functions work: WorldWise git repo

Here's the app itself: WorldWise
*/
