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

//////////////
// Cookies only
//////////////
var ClientStorageCookies = new clientStorage('cookies');
Tinytest.add('ClientStorageCookies - set() / get()', function (test) {
  ClientStorageCookies.empty();
  var testVal = 'this is test value';
  var setRes = ClientStorageCookies.set('teststorage', testVal);
  test.isTrue(setRes);
  test.equal(ClientStorageCookies.get('teststorage'), testVal);
  ClientStorageCookies.empty();
});

Tinytest.add('ClientStorageCookies - set() / get() object and array', function (test) {
  ClientStorageCookies.empty();
  var one = [1, 'one'];
  var two = {two: 2};
  var three = [{three: ['one', 'two', {'three': 3}]}];
  var setResOne = ClientStorageCookies.set('teststorageOne', one);
  var setResTwo = ClientStorageCookies.set('teststorageTwo', two);
  var setResThree = ClientStorageCookies.set('teststorageThree', three);

  test.isTrue(setResOne);
  test.isTrue(setResTwo);
  test.isTrue(setResThree);
  
  test.equal(ClientStorageCookies.get('teststorageOne'), one);
  test.equal(ClientStorageCookies.get('teststorageTwo'), two);
  test.equal(ClientStorageCookies.get('teststorageThree'), three);

  ClientStorageCookies.empty();
});

Tinytest.add('ClientStorageCookies - remove() non existent value', function (test) {
  ClientStorageCookies.empty();
  var removeRes = ClientStorageCookies.remove('1234567890asdfghjk');
  test.isFalse(removeRes);
  ClientStorageCookies.empty();
});

Tinytest.add('ClientStorageCookies - empty()', function (test) {
  ClientStorageCookies.empty();
  var setResOne = ClientStorageCookies.set('teststorageOne', 'One');
  var setResTwo = ClientStorageCookies.set('teststorageTwo', 'Two');
  var removeRes = ClientStorageCookies.empty();

  test.isTrue(removeRes);
  test.equal(ClientStorageCookies.keys(), []);

  removeRes = ClientStorageCookies.empty();
  test.isFalse(removeRes);
});

Tinytest.add('ClientStorageCookies - keys() / has() / remove()', function (test) {
  ClientStorageCookies.empty();
  var setResOne = ClientStorageCookies.set('teststorageOne', 'One');
  var setResTwo = ClientStorageCookies.set('teststorageTwo', 'Two');

  test.isTrue(!!~ClientStorageCookies.keys().indexOf('teststorageOne'));
  test.isTrue(!!~ClientStorageCookies.keys().indexOf('teststorageTwo'));

  test.isTrue(ClientStorageCookies.has('teststorageOne'));
  test.isTrue(ClientStorageCookies.has('teststorageTwo'));

  var removeRes = ClientStorageCookies.remove('teststorageOne');
  test.isTrue(removeRes);

  test.isFalse(ClientStorageCookies.has('teststorageOne'));
  test.isTrue(ClientStorageCookies.has('teststorageTwo'));
  ClientStorageCookies.empty();
});

//////////////
// LocalStorage only
//////////////
var ClientStorageLS = new clientStorage('localStorage');
Tinytest.add('ClientStorageLS - set() / get()', function (test) {
  ClientStorageLS.empty();
  var testVal = 'this is test value';
  var setRes = ClientStorageLS.set('teststorage', testVal);
  test.isTrue(setRes);
  test.equal(ClientStorageLS.get('teststorage'), testVal);
  ClientStorageLS.empty();
});

Tinytest.add('ClientStorageLS - set() / get() object and array', function (test) {
  ClientStorageLS.empty();
  var one = [1, 'one'];
  var two = {two: 2};
  var three = [{three: ['one', 'two', {'three': 3}]}];
  var setResOne = ClientStorageLS.set('teststorageOne', one);
  var setResTwo = ClientStorageLS.set('teststorageTwo', two);
  var setResThree = ClientStorageLS.set('teststorageThree', three);

  test.isTrue(setResOne);
  test.isTrue(setResTwo);
  test.isTrue(setResThree);
  
  test.equal(ClientStorageLS.get('teststorageOne'), one);
  test.equal(ClientStorageLS.get('teststorageTwo'), two);
  test.equal(ClientStorageLS.get('teststorageThree'), three);

  ClientStorageLS.empty();
});

Tinytest.add('ClientStorageLS - remove() non existent value', function (test) {
  ClientStorageLS.empty();
  var removeRes = ClientStorageLS.remove('1234567890asdfghjk');
  test.isFalse(removeRes);
  ClientStorageLS.empty();
});

Tinytest.add('ClientStorageLS - empty()', function (test) {
  ClientStorageLS.empty();
  var setResOne = ClientStorageLS.set('teststorageOne', 'One');
  var setResTwo = ClientStorageLS.set('teststorageTwo', 'Two');
  var removeRes = ClientStorageLS.empty();

  test.isTrue(removeRes);
  test.equal(ClientStorageLS.keys(), []);

  removeRes = ClientStorageLS.empty();
  test.isFalse(removeRes);
});

Tinytest.add('ClientStorageLS - keys() / has() / remove()', function (test) {
  ClientStorageLS.empty();
  var setResOne = ClientStorageLS.set('teststorageOne', 'One');
  var setResTwo = ClientStorageLS.set('teststorageTwo', 'Two');

  test.isTrue(!!~ClientStorageLS.keys().indexOf('teststorageOne'));
  test.isTrue(!!~ClientStorageLS.keys().indexOf('teststorageTwo'));

  test.isTrue(ClientStorageLS.has('teststorageOne'));
  test.isTrue(ClientStorageLS.has('teststorageTwo'));

  var removeRes = ClientStorageLS.remove('teststorageOne');
  test.isTrue(removeRes);

  test.isFalse(ClientStorageLS.has('teststorageOne'));
  test.isTrue(ClientStorageLS.has('teststorageTwo'));
  ClientStorageLS.empty();
});