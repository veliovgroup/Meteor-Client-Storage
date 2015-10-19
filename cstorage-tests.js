Tinytest.add('ClientStorage - set() / get()', function (test) {
  ClientStorage.empty();
  var testVal = 'this is test value';
  var setRes = ClientStorage.set('teststorage', testVal);
  test.isTrue(setRes);
  test.equal(ClientStorage.get('teststorage'), testVal);
  ClientStorage.empty();
});

Tinytest.add('ClientStorage - set() / get() object and array', function (test) {
  ClientStorage.empty();
  var one = [1, 'one'];
  var two = {two: 2};
  var three = [{three: ['one', 'two', {'three': 3}]}];
  var setResOne = ClientStorage.set('teststorageOne', one);
  var setResTwo = ClientStorage.set('teststorageTwo', two);
  var setResThree = ClientStorage.set('teststorageThree', three);

  test.isTrue(setResOne);
  test.isTrue(setResTwo);
  test.isTrue(setResThree);
  
  test.equal(ClientStorage.get('teststorageOne'), one);
  test.equal(ClientStorage.get('teststorageTwo'), two);
  test.equal(ClientStorage.get('teststorageThree'), three);

  ClientStorage.empty();
});

Tinytest.add('ClientStorage - remove() non existent value', function (test) {
  ClientStorage.empty();
  var removeRes = ClientStorage.remove('1234567890asdfghjk');
  test.isFalse(removeRes);
  ClientStorage.empty();
});

Tinytest.add('ClientStorage - empty()', function (test) {
  ClientStorage.empty();
  var setResOne = ClientStorage.set('teststorageOne', 'One');
  var setResTwo = ClientStorage.set('teststorageTwo', 'Two');
  var removeRes = ClientStorage.empty();

  test.isTrue(removeRes);
  test.equal(ClientStorage.keys(), []);

  removeRes = ClientStorage.empty();
  test.isFalse(removeRes);
});

Tinytest.add('ClientStorage - keys() / has() / remove()', function (test) {
  ClientStorage.empty();
  var setResOne = ClientStorage.set('teststorageOne', 'One');
  var setResTwo = ClientStorage.set('teststorageTwo', 'Two');

  test.isTrue(!!~ClientStorage.keys().indexOf('teststorageOne'));
  test.isTrue(!!~ClientStorage.keys().indexOf('teststorageTwo'));

  test.isTrue(ClientStorage.has('teststorageOne'));
  test.isTrue(ClientStorage.has('teststorageTwo'));

  var removeRes = ClientStorage.remove('teststorageOne');
  test.isTrue(removeRes);

  test.isFalse(ClientStorage.has('teststorageOne'));
  test.isTrue(ClientStorage.has('teststorageTwo'));
  ClientStorage.empty();
});