import Component from '@glimmer/component';
import { action } from '@ember/object';
import Store from '@ember-data/store';
import { inject as service } from '@ember/service';
import ListEntry from 'doleo-2-client/models/list-entry';

export interface ListEntryComponentArgs {
  entry: ListEntry;
}

export default class ListEntryComponent extends Component {
  @service declare store: Store;

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
   * Opens a dialog to edit the list entry.
   */
  @action edit() {
    debugger;
  }
}
