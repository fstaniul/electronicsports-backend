'use strict';

module.exports = {
  db: {
    host: 'localhost',
    port: 3306,
    url: '',
    database: 'website',
    password: process.env.WEBSITE_DATABASE_PASSWORD,
    name: 'db',
    user: process.env.WEBSITE_DATABASE_USERNAME,
    connector: 'mysql',
  },
};
