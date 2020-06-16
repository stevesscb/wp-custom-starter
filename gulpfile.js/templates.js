const config = require('../gulpconfig').templates;

const gulp = require('gulp');

function templatesDefault() {
  return gulp.src(config.src)
      .pipe(gulp.dest(config.dest));
}

function templatesBlock() {
  return gulp.src(config.blocksSrc)
      .pipe(gulp.dest(config.blocksDest));
}

exports.templates = gulp.parallel(templatesDefault, templatesBlock);
