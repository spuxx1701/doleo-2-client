import Component from '@glimmer/component';
import { action } from '@ember/object';
import Store from '@ember-data/store';
import { inject as service } from '@ember/service';
import ListEntry from 'doleo-2-client/models/list-entry';
import { tracked } from '@glimmer/tracking';

export interface ListEntryComponentArgs {
  entry: ListEntry;
  showCheckBox: boolean;
  showAmountInput: boolean;
}

export default class ListEntryComponent extends Component {
  @service declare store: Store;

  @tracked amount = this.entry.amount;

  constructor(owner: unknown, args: ListEntryComponentArgs) {
    super(owner, args as any);
  }

  get entry() {
    return (this.args as ListEntryComponentArgs).entry;
  }

  /**
   * Checks or unchecks the list entry.
   */
  @action toggleChecked() {
    this.entry.isChecked = !this.entry.isChecked;
    this.entry.save();
  }

  /**
   * Deletes the list entry.
   */
  @action delete() {
    this.entry.deleteRecord();
    this.entry.save();
  }

  /**
   * Handle's the change event of the amount input.
   */
  @action handleAmountChange(event: any) {
    const amount = parseInt(event.target.value);
    if (amount && !isNaN(amount) && amount > 0 && amount < 100) {
      this.amount = amount;
      this.entry.amount = amount;
      this.entry.save();
    }
  }

  /**
   * Opens a dialog to edit the list entry.
   */
  @action edit() {
    debugger;
  }
}
