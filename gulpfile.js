var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var del = require("del");

gulp.task("typescript", () => {
	return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest("./"));
});

gulp.task("build-clean", () => {
	return del(["./dist"]);
});

gulp.task("files", () => {
	return gulp.src(["./src/**/*", "!./src/**/*.ts"]).pipe(gulp.dest("./dist"));
});

gulp.task("default", gulp.series("build-clean", "typescript", "files"), () => {
	console.log("Done");
});
