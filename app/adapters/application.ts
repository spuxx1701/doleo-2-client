import RESTAdapter from '@ember-data/adapter/rest';
import ENV from 'doleo-2-client/config/environment';
import { inject as service } from '@ember/service';
import ManagerService from 'doleo-2-client/services/manager';

export default class ApplicationAdapter extends RESTAdapter {
  @service declare session: any;
  @service declare manager: ManagerService;

  host = ENV.apiUrl;
  namespace = ENV.APP['apiNamespace'] as string;

  get headers() {
    let headers = {} as any;
    if (this.session.isAuthenticated) {
      headers[
        'Authorization'
      ] = `Bearer ${this.session.data.authenticated.access_token}`;
    }

    return headers;
  }

  handleResponse(status: number, headers: {}, payload: {}, requestData: {}) {
    if (status === 401) {
      this.manager.goTo('login');
    }
    return super.handleResponse(status, headers, payload, requestData);
  }
}
