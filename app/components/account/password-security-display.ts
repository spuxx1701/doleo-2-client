import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import AccountService from 'doleo-2-client/services/account';
import { stringIsNotEmpty } from 'doleo-2-client/helpers/string-is-not-empty';

interface Args {
  password: string;
}
export default class PasswordSecurityDisplay extends Component<Args> {
  @service declare account: AccountService;

  args: Args;

  constructor(owner: unknown, args: Args) {
    super(owner, args);
    this.args = args;
  }

  /**
   * Checks a password for it's complexity and security.
   * @param input The password to checj.
   * @returns The compexity value (0-3)
   */
  checkPasswordComplexity(input: string) {
    let complexity = 0;
    const length = input.length;
    if (stringIsNotEmpty([input])) {
      let variety = 0;
      if (input.match(/[a-z]/)) variety++; // does the password have lowercase letters?
      if (input.match(/[A-Z]/)) variety++; // does the password have uppercase letters?
      if (input.match(/\d/)) variety++; // does the password have digits?
      if (input.match(/[!@#$%&*()-+=^]/)) variety++; // does the password have special characters?
      if (length >= 21 && variety > 2) complexity = 4;
      else if (length >= 11 && length <= 20 && variety > 2) complexity = 3;
      else if (length >= 10 && variety === 2) complexity = 2;
      else complexity = 1;
    }
    return complexity;
  }

  get secBarOneHighlighted() {
    const compexity = this.checkPasswordComplexity(this.args.password);
    switch (compexity) {
      case 1:
        return 'bg-color-error';
      case 2:
        return 'bg-color-warning';
      case 3:
        return 'bg-color-success';
      case 4:
        return 'bg-color-success';
      default:
        return '';
    }
  }
  get secBarTwoHighlighted() {
    const compexity = this.checkPasswordComplexity(this.args.password);
    switch (compexity) {
      case 2:
        return 'bg-color-warning';
      case 3:
        return 'bg-color-success';
      case 4:
        return 'bg-color-success';
      default:
        return '';
    }
  }
  get secBarThreeHighlighted() {
    const compexity = this.checkPasswordComplexity(this.args.password);
    switch (compexity) {
      case 3:
        return 'bg-color-success';
      case 4:
        return 'bg-color-success';
      default:
        return '';
    }
  }

  get secBarFourHighlighted() {
    const compexity = this.checkPasswordComplexity(this.args.password);
    switch (compexity) {
      case 4:
        return 'bg-color-success';
      default:
        return '';
    }
  }
}
