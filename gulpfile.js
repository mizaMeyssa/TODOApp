var gulp = require('gulp');
var clean = require('gulp-clean');
var gulpSequence = require('gulp-sequence');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');

gulp.task('browserify', function() {
  	return gulp
	    .src(['./client/index.js'])
	    .pipe(browserify({
			insertGlobals: true,
			debug: true
		}))
		// Bundle to a single file
		.pipe(concat('bundle.js'))
		// Output it to our dist folder
		.pipe(gulp.dest('./dist/js'));
});

gulp.task('copy', function() {
  	return gulp.
	    src(['./client/templates/*.html']).
	    pipe(gulp.dest('./dist/templates/'));
});

gulp.task('clean', function () {
    return gulp.src('bin')
        .pipe(clean());
});

gulp.task('build', gulpSequence('clean', ['browserify', 'copy']));

gulp.task('watch', function() {
  gulp.watch(['./*.js', './*.html', './client/*.js', './client/components/*.js', './client/templates/*.html'], ['browserify', 'copy']);
});
