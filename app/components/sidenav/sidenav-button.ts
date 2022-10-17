import ButtonComponent, { Args as ButtonComponentArgs } from '../common/button';

export interface Args extends ButtonComponentArgs {
  text: string;
  icon: string;
}

export default class SidenavButtonComponent extends ButtonComponent {
  declare args: Args;

  constructor(owner: unknown, args: Args) {
    super(owner, args);
  }
}
