var gulp = require('gulp')
var connect = require('gulp-connect')
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnext = require('postcss-cssnext');
var sourcemaps = require('gulp-sourcemaps');




gulp.task('connect', function(){
    connect.server({
        root: 'dist',
        port: 8000,
        livereload: true
    })
})

gulp.task('html', function(){
    return gulp.src('app/*.html')
        .pipe(gulp.dest('dist/'))
        .pipe(connect.reload())
})

gulp.task('css', function () {
    var plugins = [
        cssnext,
        autoprefixer()
    ]
    return gulp.src('app/css/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss(plugins))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload())
});


gulp.task('watch', function () {
    gulp.watch(['./app/*.html'], ['html'])
    gulp.watch(['./app/css/*.css'], ['css'])
})

gulp.task('default', ['connect','watch'])
