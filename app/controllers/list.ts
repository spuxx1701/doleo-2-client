import Controller from '@ember/controller';
import Store from '@ember-data/store';
import { inject as service } from '@ember/service';
import List from 'doleo-2-client/models/list';

export default class ListController extends Controller {
  @service declare store: Store;

  declare model: List;
}
