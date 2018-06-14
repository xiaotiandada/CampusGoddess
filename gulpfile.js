var gulp = require('gulp')
var connect = require('gulp-connect')
var less = require('gulp-less')


gulp.task('connect', function(){
    connect.server({
        root: 'app',
        port: 8000,
        livereload: true
    })
})

gulp.task('html', function(){
    return gulp.src('app/*.html')
        .pipe(connect.reload())
})

gulp.task('less', function () {
    return gulp.src('app/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('app/css'))
        .pipe(connect.reload())

})



gulp.task('watch', function () {
    gulp.watch(['./app/*.html'], ['html'])
    gulp.watch(['./app/less/*.less'], ['less'])
})

gulp.task('default', ['connect','watch'])
