import config from '../gulpconfig.js';

import gulp from 'gulp';

function templatesDefault() {
  return gulp.src(config.templates.src)
      .pipe(gulp.dest(config.templates.dest));
}

function templatesBlock() {
  return gulp.src(config.templates.blocksSrc)
      .pipe(gulp.dest(config.templates.blocksDest));
}

export default gulp.parallel(
    templatesDefault,
    templatesBlock,
);
