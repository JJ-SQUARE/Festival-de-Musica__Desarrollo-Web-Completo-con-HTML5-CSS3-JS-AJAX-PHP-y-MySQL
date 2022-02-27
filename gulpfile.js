const { src, dest, watch, parallel } = require('gulp') // con esto se importan las funciones

// CSS
const sass = require("gulp-sass")(require("sass"));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss')
const sourcemaps = require('gulp-sourcemaps')

// Image
const cache = require("gulp-cache");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const avif = require("gulp-avif");

// JS

const terser = require('gulp-terser-js');


function css(done) {
    src('src/scss/**/*.scss')
        .pipe( sourcemaps.init() )
        .pipe( plumber() )
        .pipe( sass() )
        .pipe( postcss( [ autoprefixer(), cssnano() ] ) )
        .pipe( sourcemaps.write('.') )
        .pipe( dest('build/css') )
    done();
}

function images(done) {
    const opciones = {
        optimizationLevel: 3
    }
    src('src/img/**/*.{png,jpg}') //No poner espacios entre los formatos porque no se exporta.
        .pipe( cache( imagemin(opciones) ) )
        .pipe( dest('build/img') )
    done();
}

function webpVersion(done) {
    const opciones = {
        quality: 50
    }
    src('src/img/**/*.{png,jpg}') //No poner espacios entre los formatos porque no se exporta.
        .pipe( webp(opciones) )
        .pipe( dest('build/img') )
    done();
}

function avifVersion(done) {
    const opciones = {
        quality: 50
    }
    src('src/img/**/*.{png,jpg}')
        .pipe( avif(opciones) )
        .pipe( dest('build/img') )
    done();
}

function javascript(done) {
    src( 'src/js/**/*.js')
        .pipe( sourcemaps.init() )
        .pipe( terser() )
        .pipe( sourcemaps.write('.') )
        .pipe( dest('build/js') )
    done();
}

function dev(done) {
    watch('src/scss/**/*.scss', css); // Manda a llamar archivo y la función anterior 'css'
    watch('src/js/**/*.js', javascript);
    done();
}



exports.css = css; // se puede poner c/u para llamarlas de forma individual, pero se les llama a todas en el dev.
exports.js = javascript;
exports.images = images;
exports.webpVersion = webpVersion;
exports.avifVersion = avifVersion;
exports.dev = parallel( images, webpVersion, avifVersion, javascript, dev  ); //como la función dev llama a css ya no es necesario llamar en la terminal al css. De igual forma el parallel ayuda a que con dev el webpVersion venga por default.