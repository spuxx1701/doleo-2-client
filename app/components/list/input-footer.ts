import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import CustomStore from 'doleo-2-client/services/custom-store';
import { inject as service } from '@ember/service';
import List from 'doleo-2-client/models/list';
import ListEntry from 'doleo-2-client/models/list-entry';
import { stringIsNotEmpty } from 'doleo-2-client/helpers/string-is-not-empty';

export interface Args {
  list: List;
}

export default class ListEntryComponent extends Component<Args> {
  @service declare store: CustomStore;

  declare args: Args;
  @tracked declare text: string;
  @tracked amount: number = 1;

  get list() {
    return this.args.list;
  }

  @action handleAmountChange(event: any) {
    const amount = parseInt(event.target.value);
    if (!amount || amount < 0) {
      event.target.value = 1;
    } else if (amount > 99) {
      event.target.value = 99;
    }
    this.amount = parseInt(event.target.value);
  }

  @action createListEntry(event: any) {
    event.preventDefault();
    if (stringIsNotEmpty([this.text])) {
      const newEntry = {
        text: this.text,
        list: this.list,
        isChecked: false,
        amount: this.amount || 1,
      } as ListEntry;
      const entry = this.store.createRecord('list-entry', newEntry);
      this.store.trySave(entry);
      this.text = '';
      this.amount = 1;
      document.getElementById('list-new-entry-input')?.focus();
    }
  }
}
