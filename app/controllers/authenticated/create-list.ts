import Controller from '@ember/controller';
import CustomStore from 'doleo-2-client/services/store';
import { inject as service } from '@ember/service';
import { stringIsNotEmpty } from 'doleo-2-client/helpers/string-is-not-empty';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import ManagerService from 'doleo-2-client/services/manager';

export default class ListController extends Controller {
  @service declare manager: ManagerService;
  @service declare store: CustomStore;
  @service declare notifications: any;
  declare model: { displayName: string; iconName: string };

  @tracked displayName = this.model.displayName;
  @tracked iconName = this.model.iconName;

  get createDisabled() {
    return (
      !stringIsNotEmpty([this.displayName]) ||
      !stringIsNotEmpty([this.iconName])
    );
  }

  @action async createList() {
    const list = this.store.createRecord('list', {
      displayName: this.displayName,
      iconName: this.iconName,
      entries: [],
    });
    await list.save();
    if (list.id) {
      this.manager.goTo(`/list/${list.id}`);
      this.notifications.success(`'${list.displayName}' wurde angelegt.`);
    } else {
      this.notifications.error(
        'Das hat leider nicht geklappt. Bitte prüfe Deine Internetverbindung und probiere es später nochmal!'
      );
    }
  }
}
