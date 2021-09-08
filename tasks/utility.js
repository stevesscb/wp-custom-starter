import config from '../gulpconfig.js';

import del from 'del';

function clean() {
  return del(config.utility.clean);
}

export {clean};
