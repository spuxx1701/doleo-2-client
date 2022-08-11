import RESTAdapter from '@ember-data/adapter/rest';
import ENV from 'doleo-2-client/config/environment';

export default class ApplicationAdapter extends RESTAdapter {
  host = ENV.apiUrl;
  namespace = ENV.APP.apiNamespace;
}
