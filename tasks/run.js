/*eslint no-console: 0*/

let nodemon = require('gulp-nodemon');

module.exports = (gulp) => {
    gulp.task('run', ['compile:src'], () => {
        var stream = nodemon({
            script: 'index.js',
            watch: 'src',
            ext: 'ts',
            tasks: ['compile:src'],
            env: { 'DEBUG': 'Application,Request,Response' },
            delay: 5
        });
        stream.on('restart', () => console.log('Restarting...'));
        return stream;
    });
};
