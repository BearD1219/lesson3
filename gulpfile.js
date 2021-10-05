const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');



// Static server
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "dist"
        },
        notify: false
    });

    gulp.watch('src/*.html').on('change', browserSync.reload);
    gulp.watch('src/js/**/*.js').on('change', browserSync.reload);
});

gulp.task('styles', function() {
    return gulp.src('src/sass/**/*.+(scss|sass)')
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('src/css'))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({
            prefix: "",
            suffix: ".min",
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('html', function() {
    return gulp.src('src/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'));
});

gulp.task('onceMoveFiles', function() {
    return gulp.src(['src/mailer/**', 'src/fonts/**', 'src/img/**'], {base: 'src/'})
        .pipe(gulp.dest('dist'));
});

gulp.task('scripts', function() {
    return gulp.src('src/js/**/*.js', {base: 'src/'})
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
    gulp.watch('src/sass/**/*.+(scss|sass)', gulp.parallel('styles'));
    gulp.watch('src/*.html').on('change', gulp.parallel('html'));
    gulp.watch('src/js/**/*.js').on('change', gulp.parallel('scripts'));
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'html', 'onceMoveFiles', 'scripts'));