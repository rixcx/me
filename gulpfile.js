//----------------------------------------------------------------------
//  モード
//----------------------------------------------------------------------
"use strict";

//----------------------------------------------------------------------
//  モジュール読み込み
//----------------------------------------------------------------------
const gulp = require("gulp");
const { src, dest, watch, series, parallel } = require("gulp");
const plumber = require("gulp-plumber");
const sass = require('gulp-sass')(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const cssmin = require("gulp-cssmin");
const rename = require("gulp-rename");

//----------------------------------------------------------------------
//  関数定義
//----------------------------------------------------------------------
gulp.task('compile', function(done) {
	src("src/sass/*.scss")
	.pipe(plumber())
	.pipe(sass())
	.pipe(autoprefixer())
	.pipe(cssmin())
	.pipe(rename({
		suffix: ".min",
  }))
	.pipe(dest("css"));
	done();
})

gulp.task('watch', function() {
	gulp.watch('src/sass/*.scss', gulp.series('compile'))
})

//----------------------------------------------------------------------
//  タスク定義
//----------------------------------------------------------------------
gulp.task('default', gulp.series('watch'))

/************************************************************************/
/*  END OF FILE                                                         */
/************************************************************************/