const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
// i guess the create allows for reload to happen?
const browserSync = require('browser-sync').create();
// makes the browser reload whne browsersynnc is called
const reload = browserSync.reload;

gulp.task('styles', () => {
    // find the file 
    return gulp.src('./styles/styles.scss')
        // gulp takes partial and streams thru take data above and feed it thru another function for us (sass) which is indicated above
        // also if it doesnt work we wat an  error fallback (logError)
        .pipe(sass().on('error', sass.logError))
        // conncat css files together
        // make a new file called style css 
        .pipe(concat('styles.css'))
        // put it in the styles folder
        .pipe(gulp.dest('./styles'))
        // as thinngs come in itll reloda itself more asynchronous
        .pipe(reload({
            stream: true
        }));

});

// convert new js to old js
gulp.task('scripts', () => {
    // gon take script.js
    return gulp.src('./js/script.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(concat('main.js'))
        // makes a new js file with old js into main.js
        .pipe(gulp.dest('./js'))
        .pipe(reload({
            stream: true
        }));
});

//  initialize browsersynch on this directory "."
gulp.task('bs', () => {
    browserSync.init({
        server: '.'
    });
});

// as a second param we can input  an array of other tasks we want to run
gulp.task('default', ['styles', 'scripts', 'bs'], () => {
    // watch for  any file inn styles folder with the extention of scss  to change and then run styles
    gulp.watch('./styles/**/*.scss', ['styles']);
    // be more specific because it will watch the mainn.js as well
    gulp.watch('./js/script.js', ['scripts']);
    // watch for anychange in html and reload
    gulp.watch('*.html', reload);
});
