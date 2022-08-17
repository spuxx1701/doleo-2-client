import Controller from '@ember/controller';
import { action } from '@ember/object';
import Store from '@ember-data/store';
import { inject as service } from '@ember/service';
import ListEntry from 'doleo-2-client/models/list-entry';
import List from 'doleo-2-client/models/list';

export default class ListController extends Controller {
  @service declare store: Store;

  declare model: List;

  @action
  createEntry() {
    const newEntry = {
      text: 'New Entry',
      list: this.model,
    } as ListEntry;
    const entry = this.store.createRecord('list-entry', newEntry);
    entry.save();
    // this.store.pushPayload<ListEntry>('list-entry', newEntry);

    console.log(this.model);
  }
}
