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
    // Provide authorization headers on all requests.
    let headers = {} as any;
    if (this.session.isAuthenticated) {
      headers[
        'Authorization'
      ] = `Bearer ${this.session.data.authenticated.access_token}`;
    }
    return headers;
  }

  handleResponse(status: number, headers: {}, payload: {}, requestData: {}) {
    // When the client calls a protected endpoint and the API returns 401,
    // this likely means that our current session is invalid. In that case,
    // redirect to the login page.
    if (status === 401) {
      this.manager.goTo('login');
    }
    return super.handleResponse(status, headers, payload, requestData);
  }

  urlForQueryRecord(query: any, modelName: any) {
    // We manipulate Ember Data to be able to work with singular sources (like '/profile').
    // If the 'singular' query option is provided, we change the request URL.
    if (query?.singular) {
      const baseUrl = this.buildURL();
      return `${baseUrl}/${modelName as string}`;
    }
    return super.urlForQueryRecord(query, modelName);
  }

  sortQueryParams(obj: any) {
    // When working with a single resource, don't send the 'singular' property as
    // an actual query parameter.
    if (Object.keys(obj).find(() => 'singular')) delete obj.singular;
    return super.sortQueryParams(obj);
  }
}
