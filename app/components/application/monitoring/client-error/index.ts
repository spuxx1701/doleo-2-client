import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import ClientError from 'doleo-2-client/models/client-error';

export interface Signature {
  Args: {
    clientError: ClientError;
  };
}

export default class ClientErrorComponent extends Component<Signature> {
  @tracked expanded = false;

  declare args: Signature['Args'];

  get timestamp() {
    return this.args.clientError.createdAt;
  }

  get stack() {
    return this.args.clientError.stack;
  }

  @action toggleExpanded() {
    this.expanded = !this.expanded;
  }
}
