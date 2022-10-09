import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import ManagerService from 'doleo-2-client/services/manager';
import List from 'doleo-2-client/models/list';

export interface Args {
  list: List;
}

export default class ListEntriesComponent extends Component<Args> {
  @service declare manager: ManagerService;

  declare args: Args;

  get entries() {
    const entries = this.args.list.entries.filter(
      (record) => !record.isDestroyed
    );
    return entries.sort((a, b) =>
      a.isChecked && !b.isChecked ? 1 : -1 || b.text.localeCompare(a.text)
    );
  }

  @action goToSettings() {
    this.manager.goTo(`/list/${this.args.list.id}/settings`);
  }
}
