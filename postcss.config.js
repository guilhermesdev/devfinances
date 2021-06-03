const purgecss = require('@fullhuman/postcss-purgecss');
const cssnano = require('cssnano');

module.exports = {
  plugins: [
    purgecss({
      content: ['./**/*.html', '**/*.js']
    }),
		require('autoprefixer'),
		cssnano({
			preset: 'default'
		})
  ]
}