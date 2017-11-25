const jasmine = require('gulp-jasmine');
const runSequence = require('run-sequence');
const pump = require('pump');

module.exports = (gulp, properties) => {
    gulp.task('test', (done) => {
        runSequence('compile:src', 'compile:test', () => {
            pump([
                gulp.src(properties.buildPathTest + '/**/*.js'),
                jasmine()
            ], done);
        });
    });
};
