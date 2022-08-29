import Route from '@ember/routing/route';

export default class CreateListRoute extends Route {
  model() {
    return {
      displayName: 'Meine Liste',
      iconName: 'list',
    };
  }
}
