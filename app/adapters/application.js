import RESTAdapter from '@ember-data/adapter/rest';
import ENV from 'doleo-2-client/config/environment';
import { inject as service } from '@ember/service';

export default class ApplicationAdapter extends RESTAdapter {
  @service session;
  @service manager;

  host = ENV.apiUrl;
  namespace = ENV.APP.apiNamespace;

  get headers() {
    let headers = {};
    if (this.session.isAuthenticated) {
      headers[
        'Authorization'
      ] = `Bearer ${this.session.data.authenticated.access_token}`;
    }

    return headers;
  }

  handleResponse(status) {
    if (status === 401) {
      this.manager.goTo('login');
    } else return super.handleResponse(...arguments);
  }
}
