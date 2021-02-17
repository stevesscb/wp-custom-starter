const config = require('../gulpconfig').setup;

const chalk = require('chalk');
const del = require('del');
const download = require('download');
const fs = require('fs');
const gulp = require('gulp');
const gulpStringReplace = require('gulp-string-replace');
const inquirer = require('inquirer');
const nodeFetch = require('node-fetch');
const ora = require('ora');
const through = require('through2');

const gulpStringReplaceOption = {
  logs: {
    enabled: false,
  },
};

let projectName = '';
let projectSlug = '';
let projectURL = '';
let projectSalt = '';

function setProjectIdentifiers() {
  process.stdout.write(
      process.platform === 'win32' ?
        '\x1B[2J\x1B[0f' :
        '\x1B[2J\x1B[3J\x1B[H'
  );

  console.log(
      '\n',
      chalk.bgHex('#7c01fd').black(` Grayscale WordPress Scaffolder `),
      '\n',
  );

  return inquirer.prompt([
    {
      name: 'projectName',
      message: 'Project name (alphabets, hyphens, and spaces only):',
      validate: (value) => {
        if (value === '') {
          return 'Project name cannot be empty!';
        } else if (/^[ ]/.test(value)) {
          return 'Project name cannot start with a space!';
        } else if (/[^A-Za-z -]/.test(value)) {
          return 'Alphabets, hyphens, and spaces only!';
        } else {
          projectName = value;
          return true;
        }
      },
    },
    {
      name: 'projectSlug',
      message: 'Project slug (alphabets and underscores only):',
      default: () => {
        return projectName.replace(/[^0-9|A-Z|a-z]/g, '_')
            .replace(/_+/g, '_')
            .toLowerCase();
      },
      validate: (value) => {
        if (value === '') {
          return 'Project slug cannot be empty!';
        } else if (/[^A-Za-z_]/.test(value)) {
          return 'Alphabets and underscores only!';
        } else {
          projectSlug = value;
          return true;
        }
      },
    },
    {
      name: 'projectURL',
      message: 'Project URL:',
      default: () => {
        return 'https://' + projectSlug + '.com';
      },
      validate: (value) => {
        if (/[^A-Za-z:/-.]/.test(value)) {
          return 'Alphabets, colon, forward slashes, and hyphens only!';
        } else {
          projectURL = value;
          return true;
        }
      },
    },
  ]).then((answers) => {
    return gulp.src([
      './src/**',
      './gulpconfig.js',
      './package.json',
    ], {base: './'})
        .pipe(gulpStringReplace(
            /: Grayscale/g,
            `: ${projectName}`,
            gulpStringReplaceOption
        ))
        .pipe(gulpStringReplace(
            /: grayscale/g,
            `: ${projectSlug}`,
            gulpStringReplaceOption
        ))
        .pipe(gulpStringReplace(
            /'grayscale'/g,
            `'${projectSlug}'`,
            gulpStringReplaceOption
        ))
        .pipe(gulpStringReplace(
            /grayscale-wordpress-scaffolding/g,
            `${projectSlug}`,
            gulpStringReplaceOption
        ))
        .pipe(gulpStringReplace(
            /"version": "(\d|\.)+"/g,
            `"version": "0.0.1"`,
            gulpStringReplaceOption
        ))
        .pipe(gulpStringReplace(
            /"homepage": "https:\/\/grayscale\.com\.hk"/g,
            `"homepage": "${projectURL}"`,
            gulpStringReplaceOption
        ))
        .pipe(gulp.dest('./'));
  });
}

function downloadDepdencies(cb) {
  const dependencyQuestions = [];

  Object.keys(config.dep).forEach((depName) => {
    dependencyQuestions.push({
      name: depName,
      message: `Should I download ${depName}?`,
      type: 'confirm',
      default: false,
    });
  });

  inquirer.prompt(dependencyQuestions).then((answers) => {
    const dependencySources = [];

    Object.keys(config.dep).forEach((depName) => {
      if (answers[depName]) {
        dependencySources.push(config.dep[depName]);
      }
    });

    if (!dependencySources) {
      cb();
    } else {
      const spinner = ora('Downloading...').start();

      Promise.all(dependencySources.map((url) => download(url, config.dest, {
        extract: true,
        strip: 1,
      }))).then((resolved) => {
        spinner.succeed(`Downloaded ${resolved.length} item(s).`);
      }).catch((error) => {
        spinner.fail(`Download incomplete: ${error.name}.`);
      }).finally(() => {
        cb();
      });
    }
  });
}

function wpRemoveThemes() {
  return del([
    config.dest + '/wp-content/themes/**',
    '!' + config.dest + '/wp-content/themes',
    '!' + config.dest + '/wp-content/themes/index.php',
  ]);
}

function fetchWPsalt() {
  return nodeFetch('https://api.wordpress.org/secret-key/1.1/salt/')
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error(response.statusText);
        }
      })
      .then((salt) => {
        projectSalt = salt.split('\n').filter((line) => (line)).join('\n');
      })
      .catch((error) => {
        console.error(chalk.red('fetchWPsalt Error: ' + error.message));
      });
}

function wpReplaceSalt() {
  return gulp.src(config.dest + '/wp-config*.php')
      .pipe(through.obj(function(file, enc, cb) {
        const oldWPconfig = file.contents.toString(enc).split(/\r\n|\r|\n/g);
        let newWPconfig = [];
        let isSaltReplaced = false;

        oldWPconfig.forEach((line, index) => {
          if (!line.match('put your unique phrase here')) {
            newWPconfig.push(line);
          } else if (!isSaltReplaced) {
            newWPconfig.push(projectSalt);
            isSaltReplaced = true;
          }
        });

        newWPconfig = newWPconfig.join('\n');

        file.contents = Buffer.from(newWPconfig);
        cb(null, file);
      }))
      .pipe(gulp.dest(config.dest));
}

function displayCompleteHint(cb) {
  fs.readdir(config.dest + '/', (e, files) => {
    if (e) {
      console.log(chalk.red('Cannot read directory.'));
    } else {
      console.log(
          '\n',
          chalk.bgGreen.black(` WordPress is ready. Configure the files: `),
          '\n',
      );

      files.forEach((file) => {
        if (/wp-config[\S]+\.php/.test(file)) {
          console.log(chalk.green(` 👉 ${config.dest}/${file}\r`));
        }
      });

      console.log('\r');
    }

    cb();
    process.exit();
  });
}

exports.setup = gulp.series(
    setProjectIdentifiers,
    downloadDepdencies,
    wpRemoveThemes,
    fetchWPsalt,
    wpReplaceSalt,
    displayCompleteHint,
);
