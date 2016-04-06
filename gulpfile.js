/*
Gulpfile developed from this tutorial
http://tylermcginnis.com/reactjs-tutorial-pt-2-building-react-applications-with-gulp-and-browserify/
*/

var gulp = require('gulp');
var shell = require('gulp-shell');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var react = require('gulp-react');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');
var htmlreplace = require('gulp-html-replace');
var nodemon = require('gulp-nodemon');
var imagemin = require('gulp-imagemin');

var path = {
  HTML: 'ui/index.html',
  CSS: 'ui/styles/main.css',
  IMAGES: 'ui/imgs/**/*.+(png|gif)',
  MINIFIED_OUT: 'build.min.js',
  OUT: 'build.js',
  DEST_SRC: 'dist/ui',
  DEST_BUILD: 'dist/build',
  DEST: 'dist',
  ENTRY_POINT: './ui/js/app.js'
};

gulp.task('start-db', shell.task([
	'mysql.server restart'
]));

gulp.task('transform', function(){
  gulp.src(path.JS)
    .pipe(react())
    .pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('copy', function(){
  gulp.src(path.HTML)
    .pipe(gulp.dest(path.DEST));
});

gulp.task('copy-css', function() {
  gulp.src(path.CSS)
    .pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('images', function(){
  return gulp.src(path.IMAGES)
    .pipe(imagemin())
    .pipe(gulp.dest(path.DEST_SRC + '/images'));
});

gulp.task('serve', function(){
  nodemon({
  	script: 'server.js'
  })
});

// Main tasks

// Dev
gulp.task('watch', function() {
  gulp.watch(path.HTML, ['replaceHTML-dev']);
  gulp.watch(path.CSS, ['copy-css']);

  var watcher  = watchify(browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }));

  return watcher.on('update', function () {
    watcher.bundle()
      .pipe(source(path.OUT))
      .pipe(gulp.dest(path.DEST_SRC))
      console.log('Updated');
  })
    .bundle().on('error', function(e) {
      console.log(e);
      this.emit('end');
    })
    
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.DEST_SRC));
});

// Production
gulp.task('build', function(){
  browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify]
  })
    .bundle()
    .pipe(source(path.MINIFIED_OUT))
    .pipe(streamify(uglify(path.MINIFIED_OUT)))
    .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('replaceHTML-dev', function(){
  gulp.src(path.HTML)
    .pipe(htmlreplace({
      'css': 'ui/main.css',
      'js': 'ui/' + path.OUT
    }))
    .pipe(gulp.dest(path.DEST));
});

gulp.task('replaceHTML', function(){
  gulp.src(path.HTML)
    .pipe(htmlreplace({
      'js': 'build/' + path.MINIFIED_OUT
    }))
    .pipe(gulp.dest(path.DEST));
});

gulp.task('production', ['replaceHTML', 'build']);

gulp.task('default', ['serve', 'watch']);