import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import AccountService from 'doleo-2-client/services/account';
import ManagerService from 'doleo-2-client/services/manager';

export default class ResetPasswordController extends Controller {
  @service declare manager: ManagerService;
  @service declare account: AccountService;

  @tracked email = '';

  @action submit(event: SubmitEvent) {
    event.preventDefault();
    this.account.requestPasswordReset(this.email);
    this.email = '';
    this.manager.goTo('/login');
  }
}
