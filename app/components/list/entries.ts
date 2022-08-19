import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import ManagerService from 'doleo-2-client/services/manager';

export interface ListEntriesComponentArgs {
  entries: any;
  listId: string;
}

export default class ListEntriesComponent extends Component {
  @service declare manager: ManagerService;

  get entries() {
    const entries = (this.args as ListEntriesComponentArgs).entries;
    return entries.sortBy('isChecked', 'text');
  }

  get listId() {
    return (this.args as ListEntriesComponentArgs).listId;
  }

  @action goToSettings() {
    this.manager.goTo(`/list/${this.listId}/settings`);
  }
}
