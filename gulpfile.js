'use strict'

const gulp = require("gulp");
const less = require('gulp-less');
const cleanCSS = require('gulp-clean-css');
const rename = require("gulp-rename");

function compileLess () {
    return gulp.src("styles/style.less")
        .pipe(less().on('error', console.error.bind(console)))
        .pipe(gulp.dest("dist/css"));
}

function minifyCss() {
    return gulp.src("dist/css/style.css")
        .pipe(cleanCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest("dist/css"));

}
function copyImages() {
    return gulp.src("images/**/*")
        .pipe(gulp.dest("dist/images"));
}


function watchFiles() {
    gulp.watch('styles/**/*.less', gulp.series(compileLess, minifyCss));
    gulp.watch('images/**/*', copyImages);
}

exports.default = gulp.series(
    gulp.parallel(compileLess, minifyCss, copyImages),
    watchFiles
);