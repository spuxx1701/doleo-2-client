'use strict';

module.exports = function (/* environment, appConfig */) {
  // See https://zonkyio.github.io/ember-web-app for a list of
  // supported properties

  return {
    name: 'Doleo',
    short_name: 'Doleo',
    description: 'The Doleo progressive web app.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#ffe1e1',
    theme_color: '#d87093',
    icons: [
      {
        src: 'assets/logo/144x144.png',
        sizes: '144x144',
        type: 'image/png',
      },
    ],
    ms: {
      tileColor: '#d87093',
    },
  };
};
