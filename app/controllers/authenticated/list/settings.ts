import Store from '@ember-data/store';
import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { ConfirmModalOptions } from 'doleo-2-client/components/modal/confirm';
import { stringIsNotEmpty } from 'doleo-2-client/helpers/string-is-not-empty';
import List from 'doleo-2-client/models/list';
import User from 'doleo-2-client/models/user';
import AccountService from 'doleo-2-client/services/account';
import ManagerService from 'doleo-2-client/services/manager';
import ModalService from 'doleo-2-client/services/modal';

export default class ListController extends Controller {
  @service declare manager: ManagerService;
  @service declare account: AccountService;
  @service declare store: Store;
  @service declare notifications: any;
  @service declare modal: ModalService;

  declare model: List;

  get hasChanges() {
    return false;
  }

  get isOwner() {
    return this.account.account?.id === this.model.owner.id;
  }

  get members() {
    return this.model.members.filter(
      (member) => member.id !== this.model.owner.id
    );
  }

  @action changeDisplayName(event: any) {
    if (stringIsNotEmpty([event.target.value])) {
      this.model.displayName = event.target.value;
      this.model.save();
    } else {
      event.target.value = this.model.displayName;
    }
  }

  @action changeIconName(event: any) {
    if (stringIsNotEmpty([event.target.value])) {
      this.model.iconName = (event.target.value as string).toLowerCase();
      this.model.save();
    } else {
      event.target.value = this.model.iconName;
    }
  }

  @action toggleHasAmounts(event: any) {
    this.model.hasAmounts = event.target.checked;
    this.model.save();
  }

  @action invite() {
    this.modal.selectUser({
      title: 'Jemanden einladen',
      icon: 'user-plus',
      submitLabel: 'Einladen',
      onSubmit: this.submitInvites,
    });
  }

  @action async submitInvites(selection: User[]) {
    for (const user of selection) {
      const invite = this.store.createRecord('list-invite', {
        list: this.model.id,
        recipient: user.id,
      });
      await invite.save();
    }
    this.notifications.success('Deine Einladung(en) wurden versendet.');
  }

  @action delete() {
    this.modal.confirm({
      title: 'Liste löschen',
      text: 'Die Liste und alle Einträge werden unwiederbringlich gelöscht. Möchest Du fortfahren?',
      icon: 'trash',
      yesLabel: 'Löschen',
      noLabel: 'Abbrechen',
      onYesClick: this.submitDelete,
    } as ConfirmModalOptions);
  }

  @action async submitDelete() {
    this.modal.hide();
    const result = await this.model.destroyRecord();
    if (result.isDestroyed) {
      this.manager.goTo('/');
      this.notifications.success(`'${result.displayName}' wurde gelöscht.`);
    } else {
      this.notifications.error(
        'Das hat leider nicht geklappt. Bitte prüfe Deine Internetverbindung und probiere es später nochmal!'
      );
    }
  }

  @action leave() {
    this.modal.confirm({
      title: 'Liste verlassen',
      text: 'Möchtest Du die Liste wirklich verlassen?',
      icon: 'right-from-bracket',
      yesLabel: 'Verlassen',
      noLabel: 'Abbrechen',
      onYesClick: this.submitLeave,
    } as ConfirmModalOptions);
  }

  @action async submitLeave() {
    this.modal.hide();
    const result = await this.model.destroyRecord();
    if (result.isDestroyed) {
      this.manager.goTo('/');
      this.notifications.success(
        `Du hast die Liste '${result.displayName}' verlassen.`
      );
    } else {
      this.notifications.error(
        'Das hat leider nicht geklappt. Bitte prüfe Deine Internetverbindung und probiere es später nochmal!'
      );
    }
  }

  @action goToList() {
    this.manager.goTo(`/list/${this.model.id}`);
  }
}
