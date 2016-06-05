'use strict';

import gulp from 'gulp';

import babel from 'gulp-babel';

import webpack from 'gulp-webpack';

import webpackConfig from './webpack.config.babel.js';

function build() {
  gulp.src('src/js/*.js')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('dist'));
}

gulp.task('es6:watch', () => {
  gulp.watch('src/js/*.js', (event) => {
    /*
    gulp.src(event.path)
      .pipe(babel()).on('error', (error) => {
        console.log('\n\n\nerror--------------------------------');
        console.log(error);
      })
      .pipe(gulp.dest('dist/js'));
      */
    build();
  });
});

gulp.task('default', () => {
  /*
  gulp.src('src/js/*.js')
    .pipe(babel()).on('error', (error) => {
      console.log('\n\n\nerror--------------------------------');
      console.log(error);
    })
    .pipe(gulp.dest('dist/js'));
  */
  
  build();
});