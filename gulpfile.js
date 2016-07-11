'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var compass = require('gulp-compass');
var scsslint = require('gulp-scss-lint');
var jshint = require('gulp-jshint');
var minify = require('gulp-minify');

var paths = {
    'css': 'static/css/',
    'js': 'js/',
    'sass': 'sass/',
};

var patterns = {
    'sass': [
        paths.sass + '*.scss',
        paths.sass + '_*.scss',
        paths.sass + '**/*.scss'
    ],
    'js': [
        paths.js + '*.js',
        paths.js + '**/*.js',
        '!' + paths.js + '*.min.js',
        '!' + paths.js + '**/*.min.js'
    ],
    'css': [
        paths.css + 'screen.css'
    ],
};

gulp.task('jslint', function() {
    gulp.src(patterns.js)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('jscompress', function() {
    gulp.src(patterns.js)
        .pipe(minify({
            noSource: true,
            mangle: true
        }))
        .pipe(gulp.dest('static/js/'))
});

gulp.task('scsslint', function() {
    gulp.src(patterns.sass)
        .pipe(scsslint({
            'config': './scss-lint.yml',
        }))
        .on('error', function(error) {
            gutil.log(error);
        });
});

gulp.task('compass', function() {
    gulp.src(patterns.sass)
        .pipe(compass({
            style: 'compressed',
            comments: false,
            sourcemap:true,
            force: true,
            css: paths.css,
            sass: paths.sass
        }))
        .on('error', function(error) {
            gutil.log(error);
        });
});

gulp.task('build', function() {
    gulp.start('jslint');
    gulp.start('scsslint');
    gulp.start('jscompress');
    gulp.start('compass');
});

gulp.task('default', ['build']);
