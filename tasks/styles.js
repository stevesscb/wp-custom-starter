import config from '../gulpconfig.js';

import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import dartSass from 'sass';
import fs from 'node:fs/promises';
import gulp from 'gulp';
import gulpIf from 'gulp-if';
import gulpNotify from 'gulp-notify';
import gulpPlumber from 'gulp-plumber';
import gulpPostCSS from 'gulp-postcss';
import gulpSass from 'gulp-sass';
import gulpSassVariables from 'gulp-sass-variables';
import gulpSourcemaps from 'gulp-sourcemaps';
import gulpTouchCmd from 'gulp-touch-cmd';
import postcssCalc from 'postcss-calc';
import yargs from 'yargs';

const args = yargs(process.argv.slice(2)).argv;
const packageJSON = JSON.parse(await fs.readFile('package.json'));
const sass = gulpSass(dartSass);

function stylesDefault() {
  return gulp.src(config.styles.src, {ignore: config.styles.adminSrc})
      .pipe(gulpPlumber({
        errorHandler: gulpNotify.onError('Error: <%= error.message %>'),
      }))
      .pipe(gulpSassVariables({
        $version: packageJSON.version,
      }))
      .pipe(gulpIf(!(args.production), gulpSourcemaps.init()))
      .pipe(sass.sync({
        includePaths: config.styles.includePaths,
        outputStyle: 'compressed',
      }))
      .pipe(gulpPostCSS([
        autoprefixer({
          grid: 'autoplace',
        }),
        cssnano({safe: true}),
        postcssCalc({
          precision: 2,
        }),
      ]))
      .pipe(gulpIf(!(args.production), gulpSourcemaps.write('./')))
      .pipe(gulp.dest(config.styles.dest))
      .pipe(gulpTouchCmd());
}

function stylesAdmin() {
  return gulp.src(config.styles.adminSrc)
      .pipe(gulpPlumber({
        errorHandler: gulpNotify.onError('Error: <%= error.message %>'),
      }))
      .pipe(sass.sync({
        outputStyle: 'compressed',
      }))
      .pipe(gulpPostCSS([
        autoprefixer({
          grid: 'autoplace',
        }),
        cssnano({safe: true}),
        postcssCalc({
          precision: 2,
        }),
      ]))
      .pipe(gulp.dest(config.styles.adminDest))
      .pipe(gulpTouchCmd());
}

function stylesBlocks() {
  return gulp.src(config.styles.blocksSrc)
      .pipe(gulpPlumber({
        errorHandler: gulpNotify.onError('Error: <%= error.message %>'),
      }))
      .pipe(gulpIf(!(args.production), gulpSourcemaps.init()))
      .pipe(sass.sync({
        outputStyle: 'compressed',
      }))
      .pipe(gulpPostCSS([
        autoprefixer({
          grid: 'autoplace',
        }),
        cssnano({safe: true}),
        postcssCalc({
          precision: 2,
        }),
      ]))
      .pipe(gulpIf(!(args.production), gulpSourcemaps.write('./')))
      .pipe(gulp.dest(config.styles.blocksDest))
      .pipe(gulpTouchCmd());
}

export default gulp.parallel(
    stylesDefault,
    stylesAdmin,
    stylesBlocks,
);
