'use strict';

const loadConfig = require('../util/load-config');

module.exports = function(app) {
  const Member = app.models.Member;
  const config = loadConfig('./accounts-config');
};
