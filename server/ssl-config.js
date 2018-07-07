'use strict';

const path = require('path');
const fs = require('fs');

module.exports.privateKey = fs
  .readFileSync(path.join(__dirname, './private/electronicsports.key.pem'))
  .toString();

module.exports.certificate = fs
  .readFileSync(path.join(__dirname, './private/electronicsports.cert.pem'))
  .toString();
