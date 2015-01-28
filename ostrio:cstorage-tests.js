Tinytest.add('Meteor.storage: set() / get()', function (test) {
  Meteor.storage.empty();
  var testVal = 'this is test value';
  var setRes = Meteor.storage.set('teststorage', testVal);
  test.isTrue(setRes);
  test.equal(Meteor.storage.get('teststorage'), testVal);
  Meteor.storage.empty();
});

Tinytest.add('Meteor.storage: remove() non existent value', function (test) {
  Meteor.storage.empty();
  var removeRes = Meteor.storage.remove('1234567890asdfghjk');
  test.isFalse(removeRes);
  Meteor.storage.empty();
});

Tinytest.add('Meteor.storage: empty()', function (test) {
  Meteor.storage.empty();
  var setResOne = Meteor.storage.set('teststorageOne', 'One');
  var setResTwo = Meteor.storage.set('teststorageTwo', 'Two');
  var removeRes = Meteor.storage.empty();

  test.isTrue(removeRes);
  test.equal(Meteor.storage.keys(), []);

  removeRes = Meteor.storage.empty();
  test.isFalse(removeRes);
});

Tinytest.add('Meteor.storage: keys() / has() / remove()', function (test) {
  Meteor.storage.empty();
  var setResOne = Meteor.storage.set('teststorageOne', 'One');
  var setResTwo = Meteor.storage.set('teststorageTwo', 'Two');

  test.isTrue(Meteor.storage.keys().inArray('teststorageOne'));
  test.isTrue(Meteor.storage.keys().inArray('teststorageTwo'));

  test.isTrue(Meteor.storage.has('teststorageOne'));
  test.isTrue(Meteor.storage.has('teststorageTwo'));

  var removeRes = Meteor.storage.remove('teststorageOne');
  test.isTrue(removeRes);

  test.isFalse(Meteor.storage.has('teststorageOne'));
  test.isTrue(Meteor.storage.has('teststorageTwo'));
  Meteor.storage.empty();
});