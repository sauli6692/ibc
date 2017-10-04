'use strict';
let tslint = require('gulp-tslint');

module.exports = (gulp, properties) => {
    const lint = source => {
        return gulp.src(source)
            .pipe(tslint({
                configuration: 'tslint.json'
            }))
            .pipe(tslint.report());
    };

    gulp.task('tslint:src', function() {
        return lint(properties.src + '/**/*.ts');
    });

    gulp.task('tslint:test', function() {
        return lint('test/**/*.ts');
    });
};
