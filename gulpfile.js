var gulp = require('gulp');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var connect = require('gulp-connect');
var cleanCSS = require('gulp-clean-css');

// less编译
gulp.task('less', function () {
  gulp.src('assets/less/*.less')
    .pipe(less())
		.pipe(autoprefixer())               // 加浏览器前缀
    .pipe(gulp.dest('assets/css'));
});
// css压缩
gulp.task('minify-css', function () {
  return gulp.src('assets/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'));
});
// 启动开发版服务器
gulp.task('connect', function () {
  connect.server({
    name: 'dev',
    root: 'assets',
    port: 8080,
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src('assets/*.html')
    .pipe(connect.reload());
});
// 启动检查
gulp.task('watch', function () {
  gulp.watch(['assets/*.html'], ['html']);
  gulp.watch(['assets/js/*.js'], ['html']);
  gulp.watch(['assets/less/**/*.less'], ['less']);
  gulp.watch(['assets/css/*.css'], ['html']);
});


// 本地开发服务器
gulp.task('server', ['connect', 'watch']);


// 运行步骤：
//  一：安装package.json中的依赖，用 cnpm install 简写: cnpm i
// 二：运行 gulp server
// 注意，less文件要写点东西，保存之后，才会
