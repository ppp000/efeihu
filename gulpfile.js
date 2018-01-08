/* 
* @Author: Marte
* @Date:   2017-12-28 16:14:11
* @Last Modified by:   Marte
* @Last Modified time: 2018-01-08 20:41:47
*/

//引入gulp模块，返回对象/函数
let gulp = require('gulp');
let sass = require('gulp-sass');
let htmlmin = require('gulp-htmlmin');
let clean_css = require('gulp-clean-css');
// let uglify = require('gulp-uglify');
// let concat = require('gulp-concat');

// let browserSync = require('browser-sync');

//路径
let path = {
    sass:'src/sass/*.scss'
}

//编译css
gulp.task('cssSass',function(){
    //返回文件流
    gulp.src(path.sass)

        //编译,也可选风格
        .pipe(sass({outputStyle: 'compressed'}))

        //输出
        .pipe(gulp.dest('src/css'))
})

//监听,写完js记得回到cmd执行一次 gulp jtSass
gulp.task('watchSass',function(){
    // 监听这个文件，当文件有修改时，执行响应任务
    gulp.watch(path.sass,['cssSass']);
})

//html压缩
gulp.task('htmlmin',function(){
    gulp.src('src/html/*.html')
        .pipe(htmlmin())
        .pipe(gulp.dest('dist/html'));
});

//css压缩
gulp.task('clean_css',function(){
    gulp.src('src/css/*.css')
        .pipe(clean_css())
        .pipe(gulp.dest('dist/css'));
});

//e6=>es5
// gulp.task('babel',function(){
//     gulp.src('src/js/*.js')
//         .pipe(babel())
//         .pipe(gulp.dest('dist/js'));
// });

//js压缩
// gulp.task('uglify',function(){
//     gulp.src('src/js/*.js')
//         .pipe(uglify())
//         .pipe(gulp.dest('dist/js'));
// });

//合并
// gulp.task('concat',function(){
//     gulp.src('src/html/*.html')
//         .pipe(concat())
//         .pipe(gulp.dest('dist/html'));
// });