import Controller from '@ember/controller';
import CustomStore from 'doleo-2-client/services/custom-store';
import { inject as service } from '@ember/service';
import List from 'doleo-2-client/models/list';

export default class ListController extends Controller {
  @service declare store: CustomStore;

  declare model: List;
}
