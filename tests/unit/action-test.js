import Ember from "ember";
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
var App;

module('Action Helper Integration Tests', {

  beforeEach: function() {
    App = startApp();
  },

  afterEach: function() {
    Ember.run(App, App.destroy);
  }

});

test("Action triggers on `Tap` by default", function(assert) {
  assert.expect(1);
  visit('/actions');

  andThen(function () {

    triggerEvent('#genericAction', 'tap');
    andThen(function() {
      assert.equal(currentRouteName(), 'test-successful');
    });

  });

});

test("Action triggers on a specific gesture when defined", function(assert) {

  assert.expect(1);
  visit('/actions');

  andThen(function () {

    triggerEvent('#specificActionGesture', 'swiperight');
    andThen(function() {
      assert.equal(currentRouteName(), 'test-successful');
    });

  });

});

test("Action triggers when gesture event originates on a child element.", function(assert) {
  assert.expect(1);
  visit('/actions');

  andThen(function () {

    triggerEvent('#genericAction .internal-content', 'tap');
    andThen(function() {
      assert.equal(currentRouteName(), 'test-successful');
    });

  });

});

test("Action helpers work with params.", function(assert) {

  assert.expect(1);
  visit('/actions');

  andThen(function () {

    triggerEvent('#actionWithParams', 'tap');
    andThen(function() {
      assert.equal(currentRouteName(), 'test-successful');
    });

  });

});

test("Action helpers work with params and a specific gesture.", function(assert) {

  assert.expect(1);
  visit('/actions');

  andThen(function () {

    triggerEvent('#specificGestureWithParams', 'swiperight');
    andThen(function() {
      assert.equal(currentRouteName(), 'test-successful');
    });

  });

});

test("If an action handler is on a link, a click on the link is discarded.", function(assert) {

  assert.expect(1);
  visit('/actions');

  andThen(function () {

    triggerEvent('#actionOnLink', 'click');
    andThen(function() {
      assert.equal(currentRouteName(), 'actions');
    });

  });

});

/*
 * TODO: This needs to stay commented out until we fix it, becuase the test runner
 * redirects away and we can't see test results.
 *
test("If an action handler is on a link, a click on a child element of the link is discarded.", function(assert) {

  assert.expect(1);
  visit('/actions');

  andThen(function () {

    triggerEvent('#actionOnLink .internal-content', 'click');
    andThen(function() {
      assert.equal(currentRouteName(), 'actions');
    });

  });

});
*/

test("If an action handler is on a link, tap on the link calls the action.", function(assert) {

  assert.expect(2);
  visit('/actions');

  andThen(function () {
    assert.equal($('#actionOnLink').attr('href'), "http://example.com/failure");
    triggerEvent('#actionOnLink', 'tap');
  });

  andThen(function() {
    // Importantly this doesn't cause the browser to go to example.com/failure
    assert.equal(currentRouteName(), 'test-successful');
  });

});

