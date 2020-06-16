const config = require('../gulpconfig');

const gulp = require('gulp');

const {assets} = require('./assets');
const {browsersync} = require('./browsersync');
const {clean} = require('./utility');
const {scripts, scriptsDefault, scriptsAdmin} = require('./scripts');
const {setup} = require('./setup');
const {styles} = require('./styles');
const {templates} = require('./templates');

exports.assets = assets;
exports.scripts = scripts;
exports.setup = setup;
exports.styles = styles;
exports.templates = templates;

exports.build = gulp.series(
    clean,
    gulp.parallel(assets, scripts, styles, templates),
);

exports.watch = gulp.parallel(
    browsersync,
    function monitorFiles() {
      gulp.watch(
          [
            config.assets.src,
            config.assets.blocksSrc,
          ],
          assets
      );
      scriptsDefault();
      gulp.watch(
          [
            config.scripts.adminSrc,
          ],
          scriptsAdmin
      );
      gulp.watch(
          [
            config.styles.src,
            config.styles.adminSrc,
            config.styles.blocksSrc,
          ],
          styles
      );
      gulp.watch(
          [
            config.templates.src,
            config.templates.blocksSrc,
          ],
          templates
      );
    },
);

exports.default = setup;
