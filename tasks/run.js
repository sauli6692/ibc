'use strict';
const { spawn } = require('child_process');

module.exports = (gulp) => {
    gulp.task('run', ['compile', 'watch'], () => {
        let node = spawn('node', ['index.js']);
        node.stdout.on('data', (data) => {
          console.log(`stdout: ${data}`);
        });
    });
};
