var gulp = require('gulp')
var connect = require('gulp-connect')
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnext = require('postcss-cssnext');
var sourcemaps = require('gulp-sourcemaps');

var less = require('gulp-less')
var minifycss = require('gulp-minify-css')
var htmlmin = require('gulp-htmlmin')
var imagemin = require('gulp-imagemin')




gulp.task('connect', function(){
    connect.server({
        root: 'dist',
        port: 8000,
        livereload: true
    })
})

gulp.task('html', function(){

    var options = {
        removeComments: true, // 清除HTML注释
        collapseWhitespace: true, // 压缩HTML
        minifyJS: true, // 压缩页面JS
        minifycss: true // 压缩页面CSS
    }

    return gulp.src('app/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist/'))
        .pipe(connect.reload())
})

gulp.task('less', function () {
    return gulp.src('app/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('app/css'))
})

gulp.task('css', function () {
    var plugins = [
        cssnext,
        autoprefixer()
    ]
    return gulp.src('app/css/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss(plugins))
        .pipe(minifycss())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload())
})

gulp.task('image',function () {
    var options = {
        optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
        progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
        interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
        multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
    }
    return gulp.src('app/img/*.{png,jpg,gif,ico}')
        .pipe(imagemin(options))
        .pipe(gulp.dest('dist/img'))
})


gulp.task('watch', function () {
    gulp.watch(['./app/*.html'], ['html'])
    gulp.watch(['./app/less/*.less'], ['less'])
    gulp.watch(['./app/css/*.css'], ['css'])
    gulp.watch(['./app/img/*.{png,jpg,gif,ico}'], ['image'])
})

gulp.task('default', ['connect','watch'])
