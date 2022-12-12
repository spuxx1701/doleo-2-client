import Service, { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import * as bootstrap from 'bootstrap';
import { ConfirmModalOptions } from 'doleo-2-client/components/modal/confirm';
import { InputModalOptions } from 'doleo-2-client/components/modal/input';
import { SelectUserModalOptions } from 'doleo-2-client/components/modal/select-user';
import ManagerService from './manager';

export enum ModalType {
  confirm = 'confirm',
  input = 'input',
  selectUser = 'select-user',
}

export default class ModalService extends Service {
  @service declare manager: ManagerService;

  modalElement: HTMLElement;
  modal: bootstrap.Modal;

  @tracked activeModalType: ModalType | undefined;
  @tracked activeModalOptions: object | undefined;
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

  confirm(options: ConfirmModalOptions) {
    this.setActiveModal(ModalType.confirm, options);
  }

  input(options: InputModalOptions) {
    this.setActiveModal(ModalType.input, options);
  }

  selectUser(options: SelectUserModalOptions) {
    this.setActiveModal(ModalType.selectUser, options);
  }

  setActiveModal(type: ModalType, options: object) {
    this.activeModalType = type;
    this.activeModalOptions = options;
    this.show();
  }

  show() {
    this.modal.show();
  }

  async hide() {
    this.modal.hide();
    await this.manager.sleep(this.timeToDestroy);
    this.activeModalType = undefined;
  }
}
