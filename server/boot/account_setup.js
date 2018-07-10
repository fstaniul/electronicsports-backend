'use strict';

const loadConfig = require('../util/load-config');

module.exports = function(app) {
  const Member = app.models.Member;
  const config = loadConfig('accounts-config');

  if (!Array.isArray(config)) config = [];

  const accPromises = config.map((account) => {
    const filter = {
      where: {
        or: [{ username: account.username }, { email: account.email }],
      },
    };

    return Member.find(filter).then(function(result) {
      if (result.length === 0) {
        return Member.create(account);
      } else {
        return Promise.resolve();
      }
    });
  });

  return Promise.all(accPromises);
};
