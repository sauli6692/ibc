let gulp = require('gulp');
let _ = require('lodash');
let tasks = require('./tasks');
let config = require('./config/default.json');

_.forOwn(tasks, (task) => {
    task(gulp, {
        src: config.rootSrc,
        testSrc: config.testSrc,
        buildPath: config.buildPath,
        buildPathTest: config.buildPathTest
    });
});
