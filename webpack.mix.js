const mix = require('laravel-mix');

mix.js('resources/js/app.js', 'public/js')
   .react() // 👈 this is required for React JSX
   .sass('resources/sass/app.scss', 'public/css');
