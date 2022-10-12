import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { SelectableState } from 'doleo-2-client/components/common/button-selectable';
import User from 'doleo-2-client/models/user';
import AccountService from 'doleo-2-client/services/account';
import CustomStore from 'doleo-2-client/services/store';

export interface Args {
  onSelectionChange?: Function;
}

class SelectableUser extends User {
  state: SelectableState = { selected: false };
}

export default class UserSelectComponent extends Component<Args> {
  @service declare store: CustomStore;
  @service declare account: AccountService;

  @tracked familyMembers: SelectableUser[] = [];
  @tracked familyMembersState: 'initial' | 'pending' | 'success' = 'pending';
  @tracked otherUsers: SelectableUser[] = [];
  @tracked otherUsersState: 'initial' | 'pending' | 'success' = 'initial';

  constructor(owner: unknown, args: Args) {
    super(owner, args);
    this.loadFamilyMembers();
  }

  @action async loadFamilyMembers() {
    if (this.account.account) {
      const family = await this.store.findRecord(
        'family',
        this.account.account.family.id
      );
      this.familyMembers = [];
      family.members.forEach((user) => {
        if (user.id !== this.account.id) {
          this.familyMembers.push({
            ...user.serialize({ includeId: true }),
            family: user.family.serialize({ includeId: true }),
            state: { selected: false },
          } as SelectableUser);
        }
      });
      this.familyMembers.sort((a, b) =>
        a.displayName.localeCompare(b.displayName)
      );
      this.familyMembersState = 'success';
    }
  }

  @action async loadOtherUsers() {
    this.otherUsersState = 'pending';
    // We likely already have users in the store, but only family members.
    // We can force ember data to do a reload.
    const allUsers = await this.store.findAll('user', { reload: true });
    this.otherUsers = [];
    for (let user of allUsers.toArray()) {
      if (
        user.id !== this.account.id &&
        !this.familyMembers.find((member) => member.id === user.id)
      ) {
        this.otherUsers.push({
          ...user.serialize({ includeId: true }),
          family: user.family.serialize({ includeId: true }),
          state: { selected: false },
        } as SelectableUser);
      }
    }
    this.otherUsers.sort((a, b) => a.displayName.localeCompare(b.displayName));
    this.otherUsersState = 'success';
  }

  @action handleSelectionChange() {
    if (this.args.onSelectionChange) {
      this.args.onSelectionChange(this.selection);
    }
  }

  get selection() {
    return [
      ...this.familyMembers.filter((user) => user.state.selected),
      ...this.otherUsers.filter((user) => user.state.selected),
    ] as User[];
  }
}
