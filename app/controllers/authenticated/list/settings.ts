import Controller from '@ember/controller';
import { action } from '@ember/object';
import Store from '@ember-data/store';
import { inject as service } from '@ember/service';
import List from 'doleo-2-client/models/list';
import { stringIsNotEmpty } from 'doleo-2-client/helpers/string-is-not-empty';
import { tracked } from '@glimmer/tracking';
import User from 'doleo-2-client/models/user';
import ManagerService from 'doleo-2-client/services/manager';
import ModalService from 'doleo-2-client/services/modal';
import { ConfirmModalComponentOptions } from 'doleo-2-client/components/modal/confirm';
import AccountService from 'doleo-2-client/services/account';

export default class ListController extends Controller {
  @service declare manager: ManagerService;
  @service declare account: AccountService;
  @service declare store: Store;
  @service declare notifications: any;
  @service declare modal: ModalService;

  declare model: { list: List; users: User[] };

  @tracked displayName = this.model.list.displayName;
  @tracked iconName = this.model.list.iconName;

  get hasChanges() {
    return false;
  }

  get isOwner() {
    return this.account.account?.id === this.model.list.owner.id;
  }

  @action changeDisplayName(event: any) {
    if (stringIsNotEmpty([event.target.value])) {
      this.model.list.displayName = event.target.value;
      this.model.list.save();
    } else {
      this.displayName = this.model.list.displayName;
    }
  }

  @action changeIconName(event: any) {
    if (stringIsNotEmpty([event.target.value])) {
      this.model.list.iconName = event.target.value;
      this.model.list.save();
    } else {
      this.iconName = this.model.list.iconName;
    }
  }

  @action toggleHasAmounts(event: any) {
    this.model.list.hasAmounts = event.target.checked;
    this.model.list.save();
  }

  @action transfer() {
    // implement me
  }

  @action delete() {
    this.modal.confirm({
      title: 'Liste löschen',
      text: 'Die Liste und alle Einträge werden unwiederbringlich gelöscht. Möchest Du fortfahren?',
      icon: 'trash',
      yesLabel: 'Löschen',
      noLabel: 'Abbrechen',
      onYesClick: this.submitDelete,
    } as ConfirmModalComponentOptions);
  }

  @action async submitDelete() {
    this.modal.hide();
    const result = await this.model.list.destroyRecord();
    if (result.isDestroyed) {
      this.manager.goTo('/');
      this.notifications.success(`'${result.displayName}' wurde gelöscht.`);
    } else {
      this.notifications.error(
        'Das hat leider nicht geklappt. Bitte prüfe Deine Internetverbindung und probiere es später nochmal!'
      );
    }
  }

  @action goToList() {
    this.manager.goTo(`/list/${this.model.list.id}`);
  }
}
