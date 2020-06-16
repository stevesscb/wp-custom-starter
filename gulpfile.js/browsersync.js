const config = require('../gulpconfig').browsersync;

const bs = require('browser-sync');

function browsersync() {
  bs.init(config);
}

exports.browsersync = browsersync;
