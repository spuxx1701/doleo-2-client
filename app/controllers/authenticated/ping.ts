import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { SelectableUser } from 'doleo-2-client/components/users/user-select';
import User from 'doleo-2-client/models/user';
import ManagerService from 'doleo-2-client/services/manager';

export default class PingController extends Controller {
  @service declare manager: ManagerService;
  @service declare notifications: any;

  @tracked recipient: User | undefined;

  @action onRecipientChange(selection: SelectableUser[]) {
    this.recipient = selection[0] ? selection[0].record : undefined;
  }

  get isPingDisabled() {
    return this.recipient ? false : true;
  }

  @action async ping() {
    if (this.recipient) {
      await this.recipient.ping();
      this.manager.goTo('/');
      this.notifications.success(
        `Du hast ${this.recipient.displayName} angestupst. ❤️`
      );
    }
  }
}
