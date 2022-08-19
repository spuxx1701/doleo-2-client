import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export interface SidenavCollapsibleComponentArgs {
  text: string;
}

export default class SidenavCollapsibleComponent extends Component {
  @tracked isCollapsed = false;

  constructor(owner: unknown, args: SidenavCollapsibleComponentArgs) {
    super(owner, args as any);
  }

  get chevron() {
    return this.isCollapsed ? 'chevron-right' : 'chevron-down';
  }

  get state() {
    return this.isCollapsed ? 'collapsed' : 'expanded';
  }

  @action toggleCollapsed() {
    this.isCollapsed = !this.isCollapsed;
  }
}
