import Service, { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import * as bootstrap from 'bootstrap';
import { ConfirmModalComponentOptions } from 'doleo-2-client/components/modal/confirm';
import ManagerService from './manager';

export interface ConfirmModalOptions {
  yesLabel: string;
  noLabel?: string;
  icon?: string;
}

export default class ModalService extends Service {
  @service declare manager: ManagerService;

  modalElement: HTMLElement;
  modal: bootstrap.Modal;

  @tracked activeModalName: string | undefined;
  @tracked activeModalOptions: {} | undefined;
  timeToDestroy = 300;

  constructor() {
    super(...arguments);
    this.modalElement = document.getElementById('modal') as HTMLElement;
    if (!this.modalElement) {
      throw new Error(
        'Unable to find modal container. Modals will not function.'
      );
    }
    this.modal = new bootstrap.Modal(this.modalElement, {});
  }

  confirm(options: ConfirmModalComponentOptions) {
    this.activeModalName = 'confirm';
    this.activeModalOptions = options;
    this.show();
  }

  show() {
    this.modal.show();
  }

  async hide() {
    this.modal.hide();
    await this.manager.sleep(this.timeToDestroy);
    this.activeModalName = undefined;
  }
}
