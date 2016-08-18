/**
 * Created by Shweta on 8/16/16.
 */
/**
 * gulp build file for dcbi app
 * @author shweta purushe
 */

var gulp = require('gulp');

//including the concat plugin
var concat = require('gulp-concat');

//defining the concat task

/*gulp.task('copyIndex', function(){
	return gulp.src('index.html')
		.pipe(concat('index.html'))
		.pipe(gulp.dest('dist'));
});*/

gulp.task('copy', function(){
	 gulp.src('img/*.png')
	.pipe(gulp.dest('dist/img/'));
	gulp.src(['index.html', 'src/viz/*.html'])
	.pipe(gulp.dest('dist'));
});

gulp.task('concatScripts', function(){
	return gulp.src('src/**/*.js')
		.pipe(concat('dcbi.js'))
		.pipe(gulp.dest('dist'));
});

gulp.task('concatStyles', function() {
	return gulp.src(['css/*.css', 'node_modules/bootstrap/dist/css/bootstrap.css'])
		.pipe(concat('dcbi.css'))
		.pipe(gulp.dest('dist'));
});

//default task which is the
// wrapper for all tasks
gulp.task('default', ['copy', 'concatScripts', 'concatStyles']);