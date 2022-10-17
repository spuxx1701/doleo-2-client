import CustomStore from 'doleo-2-client/services/custom-store';
import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { ConfirmModalOptions } from 'doleo-2-client/components/modal/confirm';
import { stringIsNotEmpty } from 'doleo-2-client/helpers/string-is-not-empty';
import List from 'doleo-2-client/models/list';
import AccountService from 'doleo-2-client/services/account';
import ManagerService from 'doleo-2-client/services/manager';
import ModalService from 'doleo-2-client/services/modal';
import { SelectableUser } from 'doleo-2-client/components/users/user-select';

export default class ListController extends Controller {
  @service declare manager: ManagerService;
  @service declare account: AccountService;
  @service declare store: CustomStore;
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

  @action toggleUsesCheck(event: any) {
    this.model.usesCheck = event.target.checked;
    this.model.save();
  }

  @action toggleHasAmounts(event: any) {
    this.model.hasAmounts = event.target.checked;
    this.model.save();
  }

  @action toggleUsesConfirmDelete(event: any) {
    this.model.usesConfirmDelete = event.target.checked;
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

  @action async submitInvites(selection: SelectableUser[]) {
    for (const user of selection) {
      user.record.inviteToList({ list: this.model.id });
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
