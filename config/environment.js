'use strict';

module.exports = function (environment) {
  let ENV = {
    modulePrefix: 'doleo-2-client',
    environment,
    rootURL: '/',
    locationType: 'history',
    apiUrl: 'https://test.api.doleo-2.de',
    apiNamespace: '',
    EmberENV: {
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false,
      },
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    'ember-cli-notifications': {
      autoClear: true,
      clearDuration: 5000,
    },
  };

  if (environment === 'development') {
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    ENV.APP.LOG_TRANSITIONS = true;
  }

  if (environment === 'integration') {
    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;
    ENV.apiUrl = 'https://test.api.doleo-2.de';
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
    ENV.apiUrl = 'https://api.doleo-2.de';
  }

  return ENV;
};
