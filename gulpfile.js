const { src, dest, series } = require('gulp');
const clean = require('gulp-clean');
const rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var revdel = require('gulp-rev-delete-original');
const path = require('path');
const fs = require('fs');


let outputPath = 'dist'
let sourcePath = 'src'
let htmlPath = path.resolve(outputPath, 'view');
let cssPath = path.resolve(outputPath, 'resources/css/');
let jsPath = path.resolve(outputPath, 'resources/js/');
let revPath = path.resolve(outputPath, 'rev');
let cssRevPath = path.resolve(revPath, 'css');
let jsRevPath = path.resolve(revPath, 'js');


const cleanFile = (cb) => {
    try {
        var stat = fs.statSync(path.join(__dirname, outputPath));
        if (stat.isDirectory()) {
            return src(outputPath)
                .pipe(clean())
        }
        cb()
    } catch (error) {
        cb()
    }
}

const copyFile = () => {
    return src(sourcePath + '/**')
        .pipe(dest(outputPath))
}

const revCss = () => {

    return src([cssPath + '/*.css', cssPath + '/**/*.css'])
        .pipe(rev())
        .pipe(dest(cssPath))
        .pipe(rev.manifest())
        .pipe(dest(cssRevPath));
}

const revJs = () => {
    return src([jsPath + '/*.js', jsPath + '/**/*.js'])
        .pipe(rev())
        .pipe(dest(jsPath))
        .pipe(rev.manifest())
        .pipe(dest(jsRevPath));
}

const revHtml = () => {
    console.log(revPath);
    return src([revPath + '/**/*.json', 'dist/view/**/*.jsp'])
        .pipe(revCollector())
        .pipe(dest(htmlPath));
}




exports.default = series(cleanFile, copyFile, revJs, revCss, revHtml);