import config from '../gulpconfig.js';

import gulp from 'gulp';
import gulpChanged from 'gulp-changed';
import gulpIf from 'gulp-if';
import gulpImagemin from 'gulp-imagemin';
import gulpRename from 'gulp-rename';

function assetsDefault() {
  return gulp.src(config.assets.src)
      .pipe(gulpChanged(config.assets.dest))
      .pipe(gulpIf((file) => { // prevent changing SVGs
        file.extname !== '.svg';
      }, gulpImagemin()))
      .pipe(gulp.dest(config.assets.dest));
}

function assetsBlock() {
  return gulp.src(config.assets.blocksSrc)
      .pipe(gulpChanged(config.assets.dest))
      .pipe(gulpRename({dirname: ''}))
      .pipe(gulp.dest(config.assets.blocksDest));
}

export default gulp.parallel(
    assetsDefault,
    assetsBlock,
);
