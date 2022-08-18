import Controller from '@ember/controller';
import { action } from '@ember/object';
import Store from '@ember-data/store';
import { inject as service } from '@ember/service';
import List from 'doleo-2-client/models/list';
import { Router } from '@ember/routing';
import { stringIsNotEmpty } from 'doleo-2-client/helpers/string-is-not-empty';
import { tracked } from '@glimmer/tracking';
import User from 'doleo-2-client/models/user';

export default class ListController extends Controller {
  @service declare router: Router;
  @service declare store: Store;

  declare model: { list: List; users: User[] };

  @tracked displayName = this.model.list.displayName;
  @tracked iconName = this.model.list.iconName;

  get hasChanges() {
    return false;
  }

  get userOptions() {
    const options = [];
    return ['Leo', 'Doro'];
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

  @action delete() {
    console.log('Implement me!');
  }

  @action goToList() {
    this.router.transitionTo(`/list/${this.model.list.id}`);
  }
}
