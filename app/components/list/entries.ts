import Component from '@glimmer/component';
import ListEntry from 'doleo-2-client/models/list-entry';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { Router } from '@ember/routing';

export interface ListEntriesComponentArgs {
  entries: ListEntry[];
  listId: string;
}

export default class ListEntriesComponent extends Component {
  @service declare router: Router;

  get entries() {
    let entries = (this.args as ListEntriesComponentArgs).entries;
    // debugger;
    // entries.sort((a, b) => b.isChecked || a.text.localeCompare(b.text));
    return entries;
  }

  get listId() {
    return (this.args as ListEntriesComponentArgs).listId;
  }

  @action goToSettings() {
    this.router.transitionTo(`/list/${this.listId}/settings`);
  }
}
