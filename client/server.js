'use strict';

module.exports = (options) => {
  options = options || {};

  const consolidate = require('consolidate'),
      express = require('express'),
      fs = require('fs'),
      hogan = require('hogan.js'),
      path = require('path');

  const app = express();

  app.engine('mustache', consolidate.hogan);
  app.set('view engine', 'mustache');
  app.set('views', path.join(__dirname, 'views'));

  // Register partials
  let partials = {};
  const partialsDir = path.join(__dirname, 'views', 'partials');
  fs.readdirSync(partialsDir).forEach(function (file) {
    let source = fs.readFileSync(path.join(partialsDir, file), 'utf8');
    let partial = /(.+)\.mustache/.exec(file).pop();
    partials[partial] = source;
  });

  app.use(express.static(path.join(__dirname, 'static')));

  app.get('/', (req, res) => {
    res.render('index', {
      partials: {
        home: 'partials/home'
      }
    });
  });

  const server = app.listen(process.env.PORT || 3000, () => {
    const port = server.address().port;
    console.log(`App listening at http://localhost:${port}`);
  });
}
