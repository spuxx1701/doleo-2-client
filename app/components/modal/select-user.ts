import { action } from '@ember/object';
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import ModalService from 'doleo-2-client/services/modal';
import User from 'doleo-2-client/models/user';

export interface SelectUserModalOptions {
  title: string;
  icon?: string;
  submitLabel?: string;
  onSubmit: () => void;
}

interface Args {
  options: SelectUserModalOptions;
}

export default class ConfirmModalComponent extends Component<Args> {
  @service declare modal: ModalService;
  @service declare notifications: any;

  selection: User[] = [];

  declare args: Args;

  get icon() {
    return this.args.options.icon || 'circle-info';
  }

  get yesLabel() {
    return this.args.options.submitLabel || 'OK';
  }

  @action onSelectionChange(selection: User[]) {
    this.selection = selection;
  }

  @action handleSubmit() {
    if (this.selection?.length > 0) {
      this.args.options.onSubmit(this.selection);
      this.modal.hide();
    } else {
      this.notifications.error('Du hast nichts ausgewählt.');
    }
  }

  @action hide() {
    this.modal.hide();
  }
}
