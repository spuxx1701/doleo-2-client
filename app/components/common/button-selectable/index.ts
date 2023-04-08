import { action, get, set } from '@ember/object';
import Component from '@glimmer/component';

export interface Args {
  text: string;
  state: SelectableState;
  onToggle?: (state: SelectableState, context: any) => void;
  context?: any;
  showCheckbox: boolean;
}

export interface SelectableState {
  selected: boolean;
}

export default class ButtonSelectableComponent extends Component<Args> {
  declare args: Args;

  constructor(owner: unknown, args: Args) {
    super(owner, args);
  }

  get selected() {
    // We need to use Ember's builtin getter here to make sure that the state change is recognized properly.
    // eslint-disable-next-line ember/no-get
    return get(this.args.state, 'selected');
  }

  @action handleClick() {
    // We need to use Ember's builtin setter here to make sure that the state change propagates properly.
    set(this.args.state, 'selected', !this.args.state.selected);
    if (this.args.onToggle) {
      this.args.onToggle(this.args.state, this.args.context);
    }
  }
}
