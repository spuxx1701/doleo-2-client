import ButtonComponent, { ButtonComponentArgs } from '../common/button';

export interface SidenavButtonComponentArgs extends ButtonComponentArgs {
  text: string;
  icon: string;
}

export default class SidenavButtonComponent extends ButtonComponent {
  constructor(owner: unknown, args: SidenavButtonComponentArgs) {
    super(owner, args as any);
  }
}
