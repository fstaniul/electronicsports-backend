'use strict';

const path = require('path');
const fs = require('fs');

module.exports = function(fpath) {
  const rootPath = path.join(__dirname, '..');
  const env = process.env.NODE_ENV || 'production';

  // remove .js and .json
  fpath = fpath.replace(/\.js(?:on)?$/, '');
  const configFiles = [fpath, `${fpath}.${env.toLowerCase()}`].reduce(
    (acc, p) => {
      acc.push(
        path.join(rootPath, p + '.js'),
        path.join(rootPath, p + '.json')
      );
      return acc;
    },
    []
  );

  let config;
  for (const configFile of configFiles) {
    if (fs.existsSync(configFile)) {
      if (typeof config === 'undefined') {
        config = require(configFile);
      } else {
        const configToMerge = require(configFile);
        if (
          (Array.isArray(configToMerge) && !Array.isArray(config)) ||
          (!Array.isArray(configToMerge) && Array.isArray(config))
        ) {
          throw new Error('Incompatible config file types cannot merge!');
        }

        if (Array.isArray(config)) {
          config = config.concat(configToMerge);
        } else {
          config = Object.assign(config, configToMerge);
        }
      }
    }
  }

  return config;
};
