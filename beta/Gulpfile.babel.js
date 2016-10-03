'use strict'

import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
import browserSync from 'browser-sync'
import del from 'del'

const $ = gulpLoadPlugins()

gulp.task('jade:dev', () => {
    gulp.src('dev/*.jade')
        .pipe($.changed('.tmp', { extension: '.html' }))
        .pipe($.jade({ pretty: '    ' }))
        .pipe(gulp.dest('.tmp'))
        .pipe(browserSync.stream())
})

gulp.task('jade:dist', ['clean'], () => {
    gulp.src('dev/*.jade')
        .pipe($.jade())
        .pipe(gulp.dest('dist'))
})

gulp.task('sass:dev', () => {
    $.rubySass('dev/style.sass', { style: 'expanded' })
        .on('error', $.rubySass.logError)
        .pipe(gulp.dest('.tmp/'))
        .pipe(browserSync.stream())
})

gulp.task('sass:dist', () => {
    $.rubySass('dev/style.sass', { style: 'compressed' })
        .on('error', $.rubySass.logError)
        .pipe(gulp.dest('dist'))
        .pipe($.autoprefixer())
        .pipe(gulp.dest('dist'))
})

gulp.task('js:dev', () => {
    return gulp.src(['dev/**/*.js', '!dev/js/vendor/*.js'])
        .pipe($.babel({ blacklist: ['strict'] }))
        .pipe(gulp.dest('.tmp/'))
})

gulp.task('js:babel', () => {
    return gulp.src(['dev/**/*.js', '!dev/js/vendor/*.js'])
        .pipe($.babel({ blacklist: ['strict'] }))
        .pipe(gulp.dest('dist/'))
})

gulp.task('js:vendor', () => {
    return gulp.src(['dev/js/vendor/*.js'])
        .pipe(gulp.dest('dist/js/vendor/'))
})

gulp.task('js:replace', () => {
    return gulp.src('dist/*.html')
        .pipe($.htmlReplace({
            'js': 'script.js'
        }))
        .pipe(gulp.dest('dist/'))
})

gulp.task('js:dist', ['js:babel', 'js:vendor', 'js:replace'], () => {
    return gulp.src([
            'dist/js/QueryParams.js',
            'dist/js/State.js',
            'dist/js/Switch.js',
            'dist/js/URLResult.js',
            'dist/js/URLInput.js',
            'dist/js/BulkInput.js',
            'dist/js/ActionButtons.js',
            'dist/js/AnimateNumbers.js',
            'dist/js/MenuBtn.js',
            'dist/js/charts.js',
            'dist/script.js'
        ])
        .pipe($.concat('script.js'))
        .pipe($.uglify())
        .pipe(gulp.dest('dist/'))
})

gulp.task('assets:dist', ['clean'], () => {
    gulp.src('dev/images/**/*.*')
        .pipe(gulp.dest('dist/images'))
})

gulp.task('clean', cb => {
    return del([
        '.tmp'
    ], cb)
})

gulp.task('serve', ['clean', 'jade:dev', 'sass:dev'], () => {
    browserSync.init({
        server: {
            baseDir: ['.tmp', 'dev']
        }
    })

    gulp.watch("dev/**/*.jade", ['jade:dev'])
    gulp.watch("dev/**/*.sass", ['sass:dev'])
    gulp.watch("dev/**/*.scss", ['sass:dev'])
    gulp.watch("dev/**/*.js", browserSync.reload)
})

gulp.task('serve:build', () => {
    browserSync.init({
        server: {
            baseDir: ['dist']
        }
    })
})

gulp.task('build', ['jade:dist', 'sass:dist', 'js:dist', 'assets:dist'])
