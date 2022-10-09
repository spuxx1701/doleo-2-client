import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import CustomStore from 'doleo-2-client/services/store';
import { inject as service } from '@ember/service';
import List from 'doleo-2-client/models/list';
import ListEntry from 'doleo-2-client/models/list-entry';
import { stringIsNotEmpty } from 'doleo-2-client/helpers/string-is-not-empty';

export interface ListInputFooterComponentArgs {
  list: List;
}

export default class ListEntryComponent extends Component {
  @service declare store: CustomStore;

  @tracked declare value: string;

  constructor(owner: unknown, args: ListInputFooterComponentArgs) {
    super(owner, args as any);
  }

  get list() {
    return (this.args as ListInputFooterComponentArgs).list;
  }

  @action createListEntry(event: SubmitEvent) {
    event.preventDefault();
    if (stringIsNotEmpty([this.value])) {
      const newEntry = {
        text: this.value,
        list: this.list,
        amount: 1,
      } as ListEntry;
      const entry = this.store.createRecord('list-entry', newEntry);
      entry.save();
      this.value = '';
      document.getElementById('list-new-entry-input')?.focus();
    }
  }
}
