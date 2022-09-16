import { action } from '@ember/object';
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import ModalService from 'doleo-2-client/services/modal';

export interface SelectUserModalOptions {
  title: string;
  icon?: string;
  yesLabel?: string;
  onYesClick?: Function;
}

interface ConfirmModalComponentArgs {
  options: SelectUserModalOptions;
}

export default class ConfirmModalComponent extends Component {
  @service declare modal: ModalService;

  get icon() {
    return (
      (this.args as ConfirmModalComponentArgs).options.icon || 'circle-info'
    );
  }

  get yesLabel() {
    return (this.args as ConfirmModalComponentArgs).options.yesLabel || 'OK';
  }

  @action onYesClickHandler() {
    if ((this.args as ConfirmModalComponentArgs).options.onYesClick) {
      (
        (this.args as ConfirmModalComponentArgs).options.onYesClick as Function
      )();
    } else {
      this.modal.hide();
    }
  }

  @action hide() {
    this.modal.hide();
  }
}
