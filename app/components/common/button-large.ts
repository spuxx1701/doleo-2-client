import Component from '@glimmer/component';
import { action } from '@ember/object';

export interface ButtonLargeComponentArgs {
  text: string;
  icon: string;
  design?: 'dark' | 'dark-inverse';
  disabled?: boolean;
  onClick: Function;
}

export default class ButtonLargeComponent extends Component {
  constructor(owner: unknown, args: ButtonLargeComponentArgs) {
    super(owner, args as any);
    if (!args.onClick) {
      throw new Error('You most provide an @onClick handler to a button.');
    }
  }

  get design() {
    return (this.args as ButtonLargeComponentArgs).design || 'dark';
  }

  get onClick() {
    return (this.args as ButtonLargeComponentArgs).onClick;
  }

  @action onClickHandler() {
    if (this.onClick) {
      this.onClick();
    }
  }
}
