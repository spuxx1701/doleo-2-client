import Component from '@glimmer/component';
import { action } from '@ember/object';

export interface Args {
  disabled?: boolean;
  onClick: Function;
}

export default class ButtonComponent extends Component<Args> {
  declare args: Args;

  constructor(owner: unknown, args: Args) {
    super(owner, args);
    if (!args.onClick) {
      throw new Error('You most provide an @onClick handler to a button.');
    }
  }

  get onClick() {
    return this.args.onClick;
  }

  @action onClickHandler() {
    if (this.onClick) {
      this.onClick();
    }
  }
}
