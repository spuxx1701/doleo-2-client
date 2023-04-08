import { action, set } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { SelectableState } from 'doleo-2-client/components/common/button-selectable';
import User from 'doleo-2-client/models/user';
import AccountService from 'doleo-2-client/services/account';
import CustomStore from 'doleo-2-client/services/custom-store';

export interface Args {
  onSelectionChange?: (selection: User[] | SelectableUser[]) => any;
  mode?: 'single' | 'multi';
}

export interface SelectableUser {
  id: string;
  displayName: string;
  familyName: string;
  record: User;
  state: SelectableState;
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
            id: user.id,
            displayName: user.displayName,
            familyName: user.family.displayName,
            record: user,
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
    for (const user of allUsers.slice()) {
      if (
        user.id !== this.account.id &&
        !this.familyMembers.find((member) => member.id === user.id)
      ) {
        this.otherUsers.push({
          id: user.id,
          displayName: user.displayName,
          familyName: user.family.displayName,
          record: user,
          state: { selected: false },
        } as SelectableUser);
      }
    }
    this.otherUsers.sort((a, b) => a.displayName.localeCompare(b.displayName));
    this.otherUsersState = 'success';
  }

  @action handleSelectionChange(
    state: SelectableState,
    context: SelectableUser
  ) {
    if (this.mode === 'single') {
      for (const user of this.selection) {
        if (user.id !== context.id) {
          // We need to use Ember's builtin setter here to make sure the change propagates properly.
          set(user.state, 'selected', false);
        }
      }
    }
    if (this.args.onSelectionChange) {
      this.args.onSelectionChange(this.selection);
    }
  }

  get selection() {
    return [
      ...this.familyMembers.filter((user) => user.state.selected),
      ...this.otherUsers.filter((user) => user.state.selected),
    ] as SelectableUser[];
  }

  get mode() {
    return this.args.mode || 'multi';
  }
}
