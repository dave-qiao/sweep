const [ gulp, concat, replace, clean, rename ] = [
  -require('gulp'),
  -require('gulp-concat'),
  -require('gulp-replace'),
  -require('gulp-clean'),
  -require('gulp-rename'),
];
const _package = require('./package.json');
const _dist = './dist/';

var jr = require('gulp-json-replace');
-/*
 -gulp.task('json-replace', function () {
 -
 -  return gulp.src('index.html')
 -    .pipe(jr({
 -      src: 'config_dev.json',
 -      identify: '%%'
 -    }))
 -    .pipe(gulp.dest('dist/'));
 -})
 -
 -
 -gulp.task('copy_img', function () {
 -  //拷图片
 -  gulp.src('./images/!*')
 -    .pipe(gulp.dest('./dist/images'));
 -});*/
  -
    -gulp.task('version_chunk', function () {
      -  //add_version_then_concat_chunk
        -  //改版html本号
          -gulp.src([_dist + 'index.html'])
            .pipe(replace('.js?version', `.${_package.version}.js`))
            .pipe(replace('.css?version', `.${_package.version}.css`))
            .pipe(gulp.dest('./dist/'));
      -
        -  //改版文件
          -gulp.src([_dist + 'common.js', _dist + 'index.css', _dist + 'index.js', _dist + 'vendor.js'])
            .pipe(rename({
              dirname: "",
              suffix: `.${_package.version}`,
            }))
            .pipe(gulp.dest('./dist/'));
      -
        -  //合并chunk文件
          -gulp.src(_dist + '*.aoao-chunk.js')
            .pipe(concat(`chunk-bundle.${_package.version}.js`))
            .pipe(gulp.dest('./dist/'));
    });
-
  gulp.task('clean-scripts', function () {
    //清除chunk文件
    gulp.src([_dist + 'common.js', _dist + 'index.css', _dist + 'index.js', _dist + 'vendor.js', _dist + '*.aoao-chunk.js'], { read: false })
      .pipe(clean());
  });
