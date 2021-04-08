const gulp = require('gulp');

const sass = require('gulp-sass');
const cssnano =  require('gulp-cssnano');
const rev = require('gulp-rev');

//now in gulp we need to create task linked t what we want to minify

gulp.task('css' , function(){//css is the task name 
    
    console.log("minifying css....");
    gulp.src('./assets/sass/**/*.scss')
    .pipe(sass())//converts sass to css//pipe is used to call additional middleware for gulp
    .pipe(cssnano())//this will minify the css
    .pipe(gulp.dest('./assets/css'))//the destination of finally minimised files

    return gulp.src('./assets/**/*.css')//we take the files from the main assets 
    .pipe(rev())//hash the names so that if a browser has a assets file with the name in the cache it doesnt ignore ours
    .pipe(gulp.dest('./public/assets'))//and the file with the hashed names has stored here
    .pipe(rev.manifest({//manifest is the file whch =conatins the key falue pairs witth originals and hashed file names - { page1.css: page1-xys3993#ma.css , chatEngine.css : chatEngine920bnd2910#2.css}
        cwd:'public',
        merge :true
    }))
    .pipe(gulp.dest('./public/assets'))
})