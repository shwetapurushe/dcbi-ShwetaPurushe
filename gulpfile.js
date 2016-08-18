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
gulp.task('concatScripts', function(){
	return gulp.src('src/**/*.js')
		.pipe(concat('dcbi.js'))
		.pipe(gulp.dest('dist'));
});

gulp.task('concatStyles', function() {
	return gulp.src('css/*.css')
		.pipe(concat('dcbi.css'))
		.pipe(gulp.dest('dist'));
});

//default task which is the wrapper for all tasks
gulp.task('default', ['concatScripts', 'concatStyles']);