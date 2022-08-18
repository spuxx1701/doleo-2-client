import Store from '@ember-data/store';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export interface ListRouteParams {
  list_id: string;
}

export default class ListRoute extends Route {
  @service declare store: Store;

  model(params: ListRouteParams) {
    return this.store.findRecord('list', params.list_id);
  }
}
