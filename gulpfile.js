var gulp = require('gulp');
var clean = require('gulp-clean');
var gulpSequence = require('gulp-sequence');
var browserify = require('gulp-browserify');

gulp.task('browserify', function() {
  	return gulp.
	    src('./client/index.js').
	    pipe(browserify()).
	    pipe(gulp.dest('./bin'));
});

gulp.task('copy', function() {
  	return gulp.
	    src(['./client/templates/*.html']).
	    pipe(gulp.dest('./bin/templates/'));
});

gulp.task('clean', function () {
    return gulp.src('bin')
        .pipe(clean());
});

gulp.task('build', gulpSequence('clean', ['browserify', 'copy']));

gulp.task('watch', function() {
  gulp.watch(['./*.js', './*.html', './client/*.js', './client/components/*.js', './client/templates/*.html'], ['browserify', 'copy']);
});
