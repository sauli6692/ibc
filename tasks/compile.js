'use strict';

const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');
const pump = require('pump');

const rimraf = require('rimraf');
const replace = require('gulp-replace');

module.exports = (gulp, properties) => {
    gulp.task('compile:src', ['tslint:src'], (done) => {
        defineCompileTask(gulp, properties.buildPath, properties.src, done);
    });

    gulp.task('compile:test', ['tslint:test'], (done) => {
        defineCompileTask(gulp, properties.buildPathTest, properties.testSrc, done, true);
    });
};

function defineCompileTask(gulp, buildPath, src, done, isTest){
    rimraf(buildPath, () => {
        let result = gulp.src(src + '/**/*.ts')
            .pipe(tsProject());
        let pipes = [result.js];

        if(isTest) {
            pipes.push(replace('../../../../src', '../../../../dist'));
        }

        pipes.push(gulp.dest(buildPath));
        pump(pipes, done);
    });
}
