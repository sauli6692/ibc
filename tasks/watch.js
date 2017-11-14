'use strict';

module.exports = (gulp) => {
    gulp.task('watch', () => {
        return gulp.watch('src/**/*.ts', ['run']);
    });
};
