'use strict';
const tslint = require('gulp-tslint');
const pump = require('pump');

module.exports = (gulp, properties) => {
    const lint = (source, done) => {
        pump([
            gulp.src(source),
            tslint({ configuration: 'tslint.json' }),
            tslint.report()
        ], done);
    };

    gulp.task('tslint:src', function(done) {
        lint(properties.src + '/**/*.ts', done);
    });

    gulp.task('tslint:test', function(done) {
        lint('test/**/*.ts', done);
    });
};
