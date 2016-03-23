var gulp = require('gulp');
var browserify = require('gulp-browserify');
var webserver = require('gulp-webserver');
var rename = require('gulp-rename');

gulp.task('browserify', function() {
    gulp.src('./app/app.js')
        .pipe(browserify({
          insertGlobals : true,
          debug : !gulp.env.production
        }))
        .pipe(rename('bundle.js'))
        .pipe(gulp.dest('./app'))
});

gulp.task('webserver', function() {
  gulp.src('.')
    .pipe(webserver({
      livereload: false,
      directoryListing: false,
      fallback: 'index.html',
      open: true
    }));
});


// Watch Files For Changes
//gulp.task('watch', function() {
//    gulp.watch('./**/*.js', ['browserify', 'webserver']);
//});



gulp.task('default', ['browserify', 'webserver']);