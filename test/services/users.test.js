const assert = require('assert');
const app = require('../../dist/app');

describe('\'users\' service', () => {
  it('should be registered', () => {
    const service = app.service('users');

    assert.ok(service, 'Registered the service');
  });
});
