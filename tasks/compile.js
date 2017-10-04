'use strict';

let ts = require('gulp-typescript');
let tsProject = ts.createProject('tsconfig.json');

module.exports = (gulp, properties) => {
    gulp.task('compile', () => {
        let result = gulp.src(properties.src + '/**/*.ts')
            .pipe(tsProject());

        return result.js.pipe(gulp.dest(properties.buildPath));
    });
};
