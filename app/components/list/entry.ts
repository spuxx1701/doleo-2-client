import Component from '@glimmer/component';
import { action } from '@ember/object';
import Store from '@ember-data/store';
import { inject as service } from '@ember/service';
import ListEntry from 'doleo-2-client/models/list-entry';
import { tracked } from '@glimmer/tracking';
import ModalService from 'doleo-2-client/services/modal';

export interface Args {
  entry: ListEntry;
  showCheckBox: boolean;
  showAmountInput: boolean;
  usesConfirmDelete: boolean;
}

export default class ListEntryComponent extends Component<Args> {
  @service declare store: Store;
  @service declare modal: ModalService;

  declare args: Args;

  @tracked amount = this.entry.amount;

  get entry() {
    return this.args.entry;
  }

  /**
   * Checks or unchecks the list entry.
   */
  @action toggleChecked() {
    this.entry.isChecked = !this.entry.isChecked;
    this.entry.save();
  }

  /**
   * Handles the delete click.
   */
  @action handleDeleteClick() {
    console.log(this.args.usesConfirmDelete);
    if (this.args.usesConfirmDelete) {
      this.modal.confirm({
        title: 'Eintrag löschen',
        text: 'Möchtest Du den Eintrag wirklich löschen?',
        icon: 'trash',
        yesLabel: 'Ja',
        noLabel: 'Abbrechen',
        onYesClick: () => {
          this.modal.hide();
          this.delete();
        },
      });
    } else {
      this.delete();
    }
  }

  /**
   * Deletes the list entry.
   */
  @action delete() {
    this.entry.deleteRecord();
    this.entry.save();
  }

  handleAmountFocus(event: any) {
    event.target.select();
  }

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
