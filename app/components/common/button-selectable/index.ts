import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export interface Args {
  text: string;
  state: SelectableState;
  onToggle?: Function;
  context?: any;
}

export interface SelectableState {
  selected: boolean;
}

export default class ButtonSelectableComponent extends Component<Args> {
  declare args: Args;

  @tracked selected = false;

  constructor(owner: unknown, args: Args) {
    super(owner, args as any);
    this.selected = args.state.selected;
  }

  @action handleClick() {
    this.args.state.selected = !this.args.state.selected;
    this.selected = this.args.state.selected;
    if (this.args.onToggle) {
      this.args.onToggle(this.args.state, this.args.context);
    }
  }
}
