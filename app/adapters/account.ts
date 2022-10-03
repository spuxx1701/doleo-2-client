import ApplicationAdapter from 'doleo-2-client/adapters/application';

export default class AccountAdapter extends ApplicationAdapter {
  urlForQueryRecord(query: any, modelName: any) {
    return this.buildSingularUrl(modelName);
  }

  urlForUpdateRecord(id: string, modelName: any) {
    return this.buildSingularUrl(modelName);
  }

  /**
   * '/account' is a singular resource. As such, we need to manipulate
   * how Ember data builds the URL for this resource a bit.
   */
  buildSingularUrl(modelName: any) {
    const baseUrl = this.buildURL();
    return `${baseUrl}/${modelName as string}`;
  }
}
