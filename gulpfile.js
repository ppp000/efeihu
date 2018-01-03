/* 
* @Author: Marte
* @Date:   2017-12-28 16:14:11
* @Last Modified by:   Marte
* @Last Modified time: 2018-01-02 16:05:06
*/

//引入gulp模块，返回对象/函数
let gulp = require('gulp');
let sass = require('gulp-sass');
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
        .pipe(sass({outputStyle: 'expanded'}))

        //输出
        .pipe(gulp.dest('src/css'))
})

//监听,写完js记得回到cmd执行一次 gulp jtSass
gulp.task('watchSass',function(){
    // 监听这个文件，当文件有修改时，执行响应任务
    gulp.watch(path.sass,['cssSass']);
})
