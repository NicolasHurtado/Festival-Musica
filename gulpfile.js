const { series, src, dest, watch, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin= require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');
const concat = require('gulp-concat');

const paths = {
    imagenes: 'src/img/**/*',
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js'
}

function css( ){
    return src(paths.scss)
        .pipe( sass( {
            outputStyle: 'expanded'
        }))
        .pipe( dest('./build/css'))
}

function javascript() {
    return src(paths.js)
        .pipe( concat('bundle.js') )
        .pipe( dest('./build/js') )
}

function imagenes(){
    return src(paths.imagenes)
        .pipe( imagemin() )
        .pipe( dest('./build/img'))
        .pipe( notify({message: 'Imagen Minificada' }));
}

function versionWebP(){
    return src(paths.imagenes)
        .pipe( webp() )
        .pipe( dest('./build/img'))
        .pipe( notify({message: 'Versión Webp Lista' }));
}

function watchArchivos(){
    watch(paths.scss, css); // * = la carpeta actual -> ** = Todos los archivos con esa extensión
    watch(paths.js, javascript);
}

exports.css = css;
exports.imagenes = imagenes;
exports.watchArchivos = watchArchivos;

exports.default = series( css, javascript, imagenes, versionWebP, watchArchivos );