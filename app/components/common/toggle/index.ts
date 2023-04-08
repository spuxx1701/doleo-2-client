import { action } from '@ember/object';
import Component from '@glimmer/component';

export interface Args {
  label: string;
  state: boolean;
  onChange?: (event: InputEvent) => void;
}

export default class ToggleComponent extends Component<Args> {
  declare args: Args;
  constructor(owner: unknown, args: Args) {
    super(owner, args);
  }

  get state() {
    return this.args.state;
  }

  @action handleChange(event: InputEvent) {
    if (this.args.onChange) {
      this.args.onChange(event);
    }
  }
}
