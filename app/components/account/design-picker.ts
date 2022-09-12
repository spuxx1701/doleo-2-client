import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import AccountService from 'doleo-2-client/services/account';
import ManagerService from 'doleo-2-client/services/manager';

interface Args {
  selectedDesign: number;
}
export default class DesignPickerComponent extends Component<Args> {
  @service declare manager: ManagerService;
  @service declare account: AccountService;

  designs = [
    { id: 0, name: 'pink' },
    { id: 1, name: 'blue' },
    { id: 2, name: 'green' },
    { id: 3, name: 'yellow' },
  ];

  @action onDesignChange(id: number) {
    if (this.account.account) {
      this.account.account.selectedDesign = id;
      this.account.save({ showNotification: false });
      this.manager.applyDesign();
    }
  }
}
