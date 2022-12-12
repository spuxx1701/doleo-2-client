import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import ModalService from 'doleo-2-client/services/modal';

export interface InputModalOptions {
  title: string;
  type?: string;
  placeholder?: string;
  value?: string;
  text?: string;
  icon?: string;
  prefix?: string;
  yesLabel?: string;
  noLabel?: string;
  onYesClick?: Function;
  onNoClick?: Function;
}

interface Args {
  options: InputModalOptions;
}

export default class ConfirmModalComponent extends Component<Args> {
  @service declare modal: ModalService;
  @tracked value = '';
  declare args: Args;

  constructor(owner: unknown, args: Args) {
    super(owner, args);
    this.value = args.options.value || '';
  }

  get displayedValue() {
    return this.value || '';
  }

  get icon() {
    return this.args.options.icon || 'circle-info';
  }

  get prefix() {
    return this.args.options.prefix || 'fas';
  }

  get yesLabel() {
    return this.args.options.yesLabel || 'OK';
  }

  get type() {
    return this.args.options.type || 'text';
  }

  @action handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    this.onYesClickHandler();
  }

  @action onYesClickHandler() {
    if (this.args.options.onYesClick) {
      (this.args.options.onYesClick as Function)(this.value);
    } else {
      this.modal.hide();
    }
  }

  @action onNoClickHandler() {
    if (this.args.options.onNoClick) {
      (this.args.options.onNoClick as Function)();
    } else {
      this.modal.hide();
    }
  }

  @action hide() {
    this.modal.hide();
  }
}
