import ButtonComponent, { ButtonComponentArgs } from './button';

export interface ButtonLargeComponentArgs extends ButtonComponentArgs {
  text: string;
  icon: string;
  design?: 'dark' | 'dark-inverse';
}

export default class ButtonLargeComponent extends ButtonComponent {
  constructor(owner: unknown, args: ButtonLargeComponentArgs) {
    super(owner, args as any);
  }

  get design() {
    return (this.args as ButtonLargeComponentArgs).design || 'dark';
  }
}
