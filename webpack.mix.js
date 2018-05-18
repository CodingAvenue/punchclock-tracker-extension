const path = require('path');
const { mix } = require('laravel-mix');
const CircularDependencyPlugin = require('circular-dependency-plugin')
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
mix.setPublicPath('dist/');


mix.webpackConfig({
    resolve: {
        modules: ["node_modules", path.resolve('./src/js/includes/decorators')],
        alias: {
            '@components' : path.resolve('./src/js/includes/components.js'),
            '@helpers' : path.resolve('./src/js/includes/helpers.js'),
            '@classes' : path.resolve('./src/js/includes/classes.js'),
            '@services' : path.resolve('./src/js/includes/services.js'),
            '@background' : path.resolve('./src/js/includes/background.js'),
            '@root' : path.resolve('./src/js/'),
            '@styles' : path.resolve('./src/sass/'),
            '@variables.scss' : path.resolve('./src/sass/_variables.scss'),
            '@system' : path.resolve('./src/js/includes/'),
        }
    },
    resolveLoader: {
        modules: ["node_modules", path.resolve('./src/js/includes/decorators')],
    },
    plugins: [
        new CircularDependencyPlugin({
            // exclude detection of files based on a RegExp
            exclude: /a\.js|node_modules/,
            // add errors to webpack instead of warnings
            failOnError: true
        })
    ],
    module: {
        loaders: [
          // the url-loader uses DataUrls. 
          // the file-loader emits files. 
          { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
          { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
        ]
      }
});


mix
    .js('src/js/includes/app.js', 'js')
    .js('src/js/background.js', 'js')
    .js('src/js/contentscript.js', 'js')
    .sass('src/sass/app.scss', 'css')
    .copyDirectory('src/images', 'dist/images')
    .copyDirectory('src/assets', 'dist');

