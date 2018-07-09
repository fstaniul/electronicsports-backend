'use strict';

const loopback = require('loopback');
const boot = require('loopback-boot');

const app = (module.exports = loopback());

const path = require('path');

const http = require('http');
const https = require('spdy');
const sslConfig = require('./ssl-config');

app.close = function() {
  app.emit('close');
};

app.start = function() {
  const httpsOptions = {
    key: sslConfig.privateKey,
    cert: sslConfig.certificate,
  };

  let httpServer, httpsServer;

  if (app.get('https')) {
    httpsServer = https
      .createServer(httpsOptions, app)
      .listen(app.get('port'), () => {
        const baseUrl = `https://${app.get('host')}:${app.get('port')}`;
        app.emit('https-start', baseUrl);
        console.log(`Server listening at ${baseUrl}`);
      });
  }

  httpServer = http.createServer(app).listen(app.get('httpPort'), () => {
    const baseUrl = 'http://' + app.get('host') + ':' + app.get('httpPort');
    app.emit('http-start', baseUrl);
    console.log(`Server listening at ${baseUrl}`);
  });

  app.on('close', () => {
    if (httpServer) httpServer.close();
    if (httpsServer) httpsServer.close();
  });

  app.on('http-close', () => {
    if (httpServer) httpServer.close();
  });

  app.on('https-close', () => {
    if (httpsServer) httpServer.close();
  });

  return {
    http: httpServer,
    https: httpsServer,
  };
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
