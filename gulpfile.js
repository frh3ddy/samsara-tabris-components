var gulp = require('gulp');
var babel = require('gulp-babel');
var gutil = require('gulp-util');
var gplumber = require('gulp-plumber');

var errorHandler = function(){
    // default appearance
    return gplumber(function(error){
        // add indentation
        var msg = error.codeFrame.replace(/\n/g, '\n    ');
        // output styling
        gutil.log('|- ' + gutil.colors.bgRed.bold('Build Error in ' + error.plugin));
        gutil.log('|- ' + gutil.colors.bgRed.bold(error.message));
        gutil.log('|- ' + gutil.colors.bgRed('>>>'));
        gutil.log('|\n    ' + msg + '\n           |');
        gutil.log('|- ' + gutil.colors.bgRed('<<<'));
    });
};

gulp.task('build', function () {
    return gulp.src('src/**/*.js')              // #1. select all js files in the app folder
      .pipe(errorHandler())
      .pipe(babel({ presets: ['es2015'] }))    // #3. transpile ES2015 to ES5 using ES2015 preset
      .pipe(gulp.dest('build'));
});

gulp.task('watch', ['build'], function () {
    gulp.watch('src/**/*.js', ['build']);
});

gulp.task('default', ['build', 'watch']);
