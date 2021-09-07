import config from './gulpconfig.js';

import gulp from 'gulp';

import assets from './tasks/assets.js';
import browsersync from './tasks/browsersync.js';
import {clean} from './tasks/utility.js';
import scripts, {scriptsDefault, scriptsAdmin} from './tasks/scripts.js';
import setup from './tasks/setup.js';
import styles from './tasks/styles.js';
import templates from './tasks/templates.js';

export {
  assets,
  scripts,
  setup,
  styles,
  templates,
};

export const build = gulp.series(
    clean,
    gulp.parallel(assets, scripts, styles, templates),
);

export const watch = gulp.parallel(
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

export default build;
