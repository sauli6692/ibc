let gulp = require('gulp');
let _ = require('lodash');
let tasks = require('./tasks');
let config = require('./config');

_.forOwn(tasks, (task) => {
    task(gulp, {
        src: config.rootSrc,
        buildPath: config.buildPath
    });
});
