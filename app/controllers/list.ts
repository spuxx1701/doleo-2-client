import Controller from '@ember/controller';
import { action } from '@ember/object';
import Store from '@ember-data/store';
import { inject as service } from '@ember/service';
import ListEntry from 'doleo-2-client/models/list-entry';
import List from 'doleo-2-client/models/list';

export default class ListController extends Controller {
  @service declare store: Store;

  declare model: List;
}
