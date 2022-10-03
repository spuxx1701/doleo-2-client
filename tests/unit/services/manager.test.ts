import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import ManagerService from 'doleo-2-client/services/manager';

module('Unit | Service | some thing', function (hooks) {
  setupTest(hooks);

  test('should return the correct color', function (assert) {
    const manager = this.owner.lookup('service:manager') as ManagerService;
    assert.equal(manager.applyDesign(), 0);
  });
});
