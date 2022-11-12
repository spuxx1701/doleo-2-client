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
    // Do not show records that were deleted and do not yet have an id
    const entries = this.args.list.entries.filter(
      (record) => !record.isDeleted
    );
    return entries.sort(
      (a, b) =>
        Number(a.isChecked) - Number(b.isChecked) ||
        a.text.localeCompare(b.text)
    );
  }

  @action goToSettings() {
    this.manager.goTo(`/list/${this.args.list.id}/settings`);
  }
}
