import Component from '@glimmer/component';
import ListEntry from 'doleo-2-client/models/list-entry';

export interface ListEntriesComponentArgs {
  entries: ListEntry[];
}

export default class ListEntriesComponent extends Component {
  constructor(owner: unknown, args: ListEntriesComponentArgs) {
    super(owner, args as any);
  }

  get entries() {
    let entries = (this.args as ListEntriesComponentArgs).entries;
    // debugger;
    // entries.sort((a, b) => b.isChecked || a.text.localeCompare(b.text));
    return entries;
  }
}
