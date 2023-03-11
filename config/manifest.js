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
    theme_color: '#17202a',
    icons: [
      {
        src: 'assets/logo/192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
    ms: {
      tileColor: '#ffe1e1',
    },
  };
};
