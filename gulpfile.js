const { series, src, dest, watch, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin= require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');

const paths = {
    imagenes: 'src/img/**/*',
    scss: 'src/scss/**/*.scss'
}

function css( ){
    return src(paths.scss)
        .pipe( sass( {
            outputStyle: 'expanded'
        }))
        .pipe( dest('./build/css'))
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
}

exports.css = css;
exports.imagenes = imagenes;
exports.watchArchivos = watchArchivos;

exports.default = series( css, imagenes, versionWebP, watchArchivos );