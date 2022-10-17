import ButtonComponent, { Args as ButtonComponentArgs } from '../button';

export interface Args extends ButtonComponentArgs {
  text: string;
  icon: string;
  prefix: 'fas' | 'far';
  design?: 'dark' | 'dark-inverse';
}

export default class ButtonLargeComponent extends ButtonComponent {
  declare args: Args;

  constructor(owner: unknown, args: Args) {
    super(owner, args as any);
  }

  get prefix() {
    return this.args.prefix || 'fas';
  }

  get design() {
    return this.args.design || 'dark';
  }
}
