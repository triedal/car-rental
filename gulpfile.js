var gulp = require('gulp');
var shell = require('gulp-shell');
var dbTask = require('gulp-db');
var rs = require('run-sequence');
var source = require('vinyl-source-stream');
var browserify = require('browserify');

gulp.task('start-db', shell.task([
	'mysql.server restart'
]));

gulp.task('serve', shell.task([
	'node server.js'
]));

gulp.task('browserify', function() {
	return browserify('./ui/js/app.js')
		.bundle()
		// Pass desired output file to vinyl-source-stream
		.pipe(source('bundle.js'))
		// Start piping stream to tasks
		.pipe(gulp.dest('./build/'));
});