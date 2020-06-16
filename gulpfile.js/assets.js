const config = require('../gulpconfig').assets;

const gulp = require('gulp');
const gulpChanged = require('gulp-changed');
const gulpIf = require('gulp-if');
const gulpImagemin = require('gulp-imagemin');
const gulpRename = require('gulp-rename');

function assetsDefault() {
  return gulp.src(config.src)
      .pipe(gulpChanged(config.dest))
      .pipe(gulpIf((file) => { // prevent changing SVGs
        file.extname !== '.svg';
      }, gulpImagemin()))
      .pipe(gulp.dest(config.dest));
}

function assetsBlock() {
  return gulp.src(config.blocksSrc)
      .pipe(gulpChanged(config.dest))
      .pipe(gulpRename({dirname: ''}))
      .pipe(gulp.dest(config.blocksDest));
}

exports.assets = gulp.parallel(assetsDefault, assetsBlock);
