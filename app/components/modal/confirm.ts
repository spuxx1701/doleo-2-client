import { action } from '@ember/object';
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import ModalService from 'doleo-2-client/services/modal';

export interface ConfirmModalOptions {
  title: string;
  text: string;
  icon?: string;
  prefix?: string;
  yesLabel?: string;
  noLabel?: string;
  onYesClick?: () => void;
  onNoClick?: () => void;
}

interface ConfirmModalComponentArgs {
  options: ConfirmModalOptions;
}

export default class ConfirmModalComponent extends Component<ConfirmModalComponentArgs> {
  @service declare modal: ModalService;
  declare args: ConfirmModalComponentArgs;

  get icon() {
    return this.args.options.icon || 'circle-info';
  }

  get prefix() {
    return this.args.options.prefix || 'fas';
  }

  get yesLabel() {
    return this.args.options.yesLabel || 'OK';
  }

  @action onYesClickHandler() {
    if (this.args.options.onYesClick) {
      this.args.options.onYesClick();
    } else {
      this.modal.hide();
    }
  }

  @action onNoClickHandler() {
    if (this.args.options.onNoClick) {
      this.args.options.onNoClick();
    } else {
      this.modal.hide();
    }
  }

  @action hide() {
    this.modal.hide();
  }
}
