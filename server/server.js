'use strict';

const loopback = require('loopback');
const boot = require('loopback-boot');

const app = (module.exports = loopback());

const path = require('path');

app.start = function() {
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // setup that any unmatched route is being redirected to index.html of client
  const router = app.loopback.Router();
  router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
  });
  app.use(router);

  // start the server if `$ node server.js`
  if (require.main === module) app.start();
});
