import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import ModalService from 'doleo-2-client/services/modal';

export default class ApplicationController extends Controller {
  @service declare modal: ModalService;
  @service declare session: any;

  get activeModalName() {
    return this.modal.activeModalName;
  }

  get activeModalOptions() {
    return this.modal.activeModalOptions;
  }
}
