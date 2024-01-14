'use strict';

module.exports = function (environment) {
  let ENV = {
    modulePrefix: 'doleo-2-client',
    environment,
    rootURL: '/',
    locationType: 'history',
    apiUrl: 'http://localhost:3000',
    apiNamespace: '',
    EmberENV: {
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false,
      },
    },

    APP: {
      vapidPublicKey:
        'BKK7bl54Trjsx1JE3uvAWs78ADQMKTXxRDMS8nvDt6A1KgEFPUuRG6pUkT53hUrkwYDdgJE2OprRuLW4rG-qfy0',
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

  if (environment === 'staging') {
    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;
    ENV.apiUrl = 'https://test-api.doleo-2.de';
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
    ENV.apiUrl = 'https://api.doleo-2.de';
  }

  return ENV;
};
