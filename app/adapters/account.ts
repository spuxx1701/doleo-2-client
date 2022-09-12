import ApplicationAdapter from 'doleo-2-client/adapters/application';

export default class AccountAdapter extends ApplicationAdapter {
  /**
   * '/account' is a singular resource. As such, we need to manipulate
   * how Ember data builds the URL for this resource a bit.
   */
  urlForQueryRecord(query: any, modelName: any) {
    const baseUrl = this.buildURL();
    return `${baseUrl}/${modelName as string}`;
  }
}
