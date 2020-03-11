import 'dotenv/config';

import express from 'express';

import './db/database';

const app = express();

console.log(process.env.NODE_ENV);

// module.exports = app;
app.listen(process.env.PORT, () => {
  console.log('app listening on port');
});
