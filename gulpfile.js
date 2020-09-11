// 先导入模块
const gulp = require('gulp');
// 编译sass
const sass = require('gulp-sass');
// 压缩css
const cssnano = require('gulp-cssnano');
// 重命名
const rename = require('gulp-rename');
// 压缩js
const uglify = require('gulp-uglify');
// 压缩图片
const imagemin = require('gulp-imagemin');
// 压缩html
const html = require('gulp-htmlmin');
// 加载babel ES6转ES5
const babel = require('gulp-babel');

// 创建任务
// html
function fnHtml(){
    return gulp.src('./src/html/*.html')
           .pipe(html())
           .pipe(rename({suffix:'.min'}))
           .pipe(gulp.dest('./dist/html'));
}

// scss
function fnSass(){
    return gulp.src('./src/sass/*.scss')
           .pipe(sass())
           .pipe(cssnano())
           .pipe(rename({suffix:'.min'}))
           .pipe(gulp.dest('./dist/css'));
}

// js
function fnJs(){
    return gulp.src('./src/js/*.js')
           .pipe(babel({
            presets: ['@babel/env']
        }))
            .pipe(uglify())
            .pipe(rename({ suffix: '.min' }))
            .pipe(gulp.dest('./dist/js'))
}

// 压缩img
function fnImg(){
    return gulp.src('./src/img/*')
           .pipe(imagemin())
           .pipe(gulp.dest('./dist/img'))
}

// 复制首页
function fnCopyIndex(){
    return gulp.src('./src/index.html')
           .pipe(gulp.dest('./dist'))
}

// 复制插件
function fnLib(){
    return gulp.src('./src/lib/*')
           .pipe(gulp.dest('./dist/lib'))
}


// 创建监听
function fnWatch(){
    gulp.watch('./src/html/*.html',fnHtml);
    gulp.watch('./src/sass/*.scss',fnSass);
    gulp.watch('./src/js/*.js',fnJs);
    gulp.watch('./src/img/*',fnImg);
    gulp.watch('./src/index.html',fnCopyIndex);
    gulp.watch('./src/lib/*',fnLib);
}

// 导入任务
exports.html = fnHtml;
exports.sass = fnSass;
exports.js = fnJs;
exports.img = fnImg;
exports.index = fnCopyIndex;
exports.lib = fnLib;
exports.default = fnWatch;