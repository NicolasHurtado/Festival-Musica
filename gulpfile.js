const { series, src, dest, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin= require('gulp-imagemin');

function css( ){
    return src('src/scss/app.scss')
        .pipe( sass( {
            outputStyle: 'expanded'
        }))
        .pipe( dest('./build/css'))
}

function imagenes(){
    return src('src/img/**/*')
        .pipe( imagemin() )
        .pipe( dest('./build/img'))
}

function watchArchivos(){
    watch('src/scss/**/*.scss', css); // * = la carpeta actual -> ** = Todos los archivos con esa extensión
}

exports.css = css;
exports.imagenes = imagenes;
exports.watchArchivos = watchArchivos;