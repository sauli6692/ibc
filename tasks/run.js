/*eslint no-console: 0*/

const {
    spawn
} = require('child_process');

module.exports = (gulp) => {
    gulp.task('run', ['compile:src', 'watch'], () => {
        let node = spawn('node', ['index.js']);
        node.stdout.on('data', (data) => {
            console.log(`${data}`);
        });
    });
};
