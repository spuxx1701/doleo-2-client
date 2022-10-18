import EmberRouter from '@ember/routing/router';
import config from 'doleo-2-client/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('login');
  this.route('reset-password');
  this.route('authenticated', { path: '' }, function () {
    this.route('account');
    this.route('ping');
    this.route('about');
    this.route('list', { path: '/list/:list_id' }, function () {
      this.route('settings');
    });
    this.route('create-list');
  });
  this.route('not-found', { path: '*' });
});
