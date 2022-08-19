import Component from '@glimmer/component';
import { action } from '@ember/object';

export interface ButtonComponentArgs {
  disabled?: boolean;
  onClick: Function;
}

export default class ButtonComponent extends Component {
  constructor(owner: unknown, args: ButtonComponentArgs) {
    super(owner, args as any);
    if (!args.onClick) {
      throw new Error('You most provide an @onClick handler to a button.');
    }
  }

  get onClick() {
    return (this.args as ButtonComponentArgs).onClick;
  }

  @action onClickHandler() {
    if (this.onClick) {
      this.onClick();
    }
  }
}
