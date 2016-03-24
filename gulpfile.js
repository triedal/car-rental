var gulp = require('gulp');
var shell = require('gulp-shell');
var dbTask = require('gulp-db');
var rs = require('run-sequence');

gulp.task('start-db', shell.task([
	'mysql.server restart'
]));

gulp.task('serve', shell.task([
	'node server.js'
]));
