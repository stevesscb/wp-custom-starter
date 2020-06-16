const config = require('../gulpconfig').utility;

const del = require('del');

function clean() {
  return del(config.clean);
}

exports.clean = clean;
