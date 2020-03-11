import 'dotenv/config';

import express from 'express';

import './ts/db';

import route from './ts/route';

const app = express();

app.use(route);

console.log(process.env.NODE_ENV);

// module.exports = app;
app.listen(process.env.PORT, () => {
  console.log('app listening on port');
});
