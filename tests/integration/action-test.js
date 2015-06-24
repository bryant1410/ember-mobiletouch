import Ember from "ember";
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import viewRegistry from '../helpers/view-registry';

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

  var controller = getController('actions');

  andThen(function () {

    triggerEvent('#genericAction', 'tap');
    andThen(function() {
      assert.equal(controller.success, true, 'the action updated the success property');
    });

  });

});

test("Action triggers on a specific gesture when defined", function(assert) {

  assert.expect(1);
  visit('/actions');

  var controller = getController('actions');

  andThen(function () {

    triggerEvent('#specificActionGesture', 'swiperight');
    andThen(function() {
      assert.equal(controller.success, true, 'the action updated the success property');
    });

  });

});

test("Action triggers when gesture event originates on a child element.", function(assert) {
  assert.expect(1);
  visit('/actions');

  var controller = getController('actions');

  andThen(function () {

    triggerEvent('#genericAction .internal-content', 'tap');
    andThen(function() {
      assert.equal(controller.success, true, 'the action updated the success property');
    });

  });

});

test("Action helpers work with params.", function(assert) {

  assert.expect(1);
  visit('/actions');

  var controller = getController('actions');

  andThen(function () {

    triggerEvent('#actionWithParams', 'tap');
    andThen(function() {
      assert.equal(controller.success, true, 'the action updated the success property');
    });

  });

});

test("Action helpers work with params and a specific gesture.", function(assert) {

  assert.expect(1);
  visit('/actions');

  var controller = getController('actions');

  andThen(function () {

    triggerEvent('#specificGestureWithParams', 'swiperight');
    andThen(function() {
      assert.equal(controller.success, true, 'the action updated the success property');
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

test("If an action handler is on a link, tap on the link calls the action.", function(assert) {

  assert.expect(2);
  visit('/actions');

  var controller = getController('actions');

  andThen(function () {
    assert.equal($('#actionOnLink').attr('href'), "http://example.com/failure");
    triggerEvent('#actionOnLink', 'tap');

    andThen(function() {
      assert.equal(controller.success, true, 'the action updated the success property');
    });

  });

});

test("Tap allowed to bubble through action-bearing elements", function(assert) {

  assert.expect(1);
  visit('/actions');

  andThen(function () {
    triggerEvent('#bubblingAction', 'tap');
  });

  andThen(function() {
    var view = viewRegistry(App).containsBubblingAction;
    assert.equal(view.get('tapEvidence'), 1, 'bubbled');
  });

});

test("Click doesn't bubble through action-bearing elements", function(assert) {

  assert.expect(1);
  visit('/actions');

  andThen(function () {
    triggerEvent('#bubblingAction', 'click');
  });

  andThen(function() {
    var view = viewRegistry(App).containsBubblingAction;
    assert.equal(view.get('internalClickEvidence'), 0, 'no internalClick');
  });

});
