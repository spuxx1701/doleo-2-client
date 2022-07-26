import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import ListEntry from 'doleo-2-client/models/list-entry';
import { tracked } from '@glimmer/tracking';
import ModalService from 'doleo-2-client/services/modal';
import CustomStore from 'doleo-2-client/services/custom-store';
import { stringIsNotEmpty } from 'doleo-2-client/helpers/string-is-not-empty';

export interface Args {
  entry: ListEntry;
  disabled: boolean;
  showLoadingIndicator: boolean;
  showCheckBox: boolean;
  showDelete: boolean;
  showAmountInput: boolean;
  usesConfirmDelete: boolean;
}

export default class ListEntryComponent extends Component<Args> {
  @service declare store: CustomStore;
  @service declare modal: ModalService;

  declare args: Args;

  @tracked amount = this.entry.amount;

  get entry() {
    return this.args.entry;
  }

  get isNew() {
    return this.args.entry.get('isNew');
  }

  /**
   * Checks or unchecks the list entry.
   */
  @action toggleChecked() {
    this.entry.isChecked = !this.entry.isChecked;
    this.store.trySave(this.entry);
  }

  /**
   * Handles the delete click.
   */
  @action handleDeleteClick() {
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
    this.store.trySave(this.entry);
  }

  handleAmountFocus(event: any) {
    event.target.select();
  }

  @action handleAmountChange(event: any) {
    const amount = parseInt(event.target.value);
    if (amount && !isNaN(amount) && amount > 0 && amount < 100) {
      this.amount = amount;
      this.entry.amount = amount;
      this.store.trySave(this.entry);
    }
  }

  @action handleTextClick() {
    this.modal.input({
      title: 'Eintrag bearbeiten',
      icon: 'edit',
      value: this.entry.text,
      placeholder: this.entry.text,
      noLabel: 'Abbrechen',
      onYesClick: this.editText,
    });
  }

  @action editText(value: string) {
    this.modal.hide();
    if (stringIsNotEmpty([value]) && value !== this.entry.text) {
      this.entry.text = value;
      this.store.trySave(this.entry);
    }
  }
}
