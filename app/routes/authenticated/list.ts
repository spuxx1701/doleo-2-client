import CustomStore from 'doleo-2-client/services/custom-store';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export interface ListRouteParams {
  list_id: string;
}

export default class ListRoute extends Route {
  @service declare store: CustomStore;

  model(params: ListRouteParams) {
    return this.store.findRecord('list', params.list_id);
  }
}
