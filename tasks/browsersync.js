import config from '../gulpconfig.js';

import bs from 'browser-sync';

function browsersync() {
  bs.init(config.browsersync);
}

export default browsersync;
