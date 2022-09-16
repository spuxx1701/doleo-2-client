import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import Family from 'doleo-2-client/models/family';
import List from 'doleo-2-client/models/list';
import User from 'doleo-2-client/models/user';

interface Args {
  list: List;
  family: Family;
}
export default class UserMultiSelectComponent extends Component<Args> {
  @tracked expanded = false;

  get members() {
    console.log(this.args.list);
    const selection = [...this.args.list.members];
    selection.forEach((member, index) => {
      if (member.id === this.args.list.owner.id) {
        selection.splice(index, 1);
      }
    });
    console.log(selection);
    return selection;
  }

  get familyMembers() {
    return this.args.family.members;
  }

  get otherUsers() {
    return [];
  }

  @action toggleExpanded() {
    this.expanded = !this.expanded;
  }

  @action select() {
    // implement me
  }

  @action loadAll() {
    // implement me
  }
}
