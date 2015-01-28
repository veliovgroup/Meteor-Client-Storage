Client storage for Meteor
========

Boilerplate Client storage functions, localStorage with fall-back to Cookies

Non-reactive, doesn't share between tabs - __cstorage__ package is just simple and efficient Client storage tool

Install:
========
```shell
meteor add ostrio:cstorage
```

Usage:
========
#### Get
 - `get(key)` - Read a record. If the cookie doesn't exist a null value will be returned.

#### Set
 - `set('key', value)` - Create/overwrite a value in storage

#### Remove
 - `remove(key)` - Remove a record

#### Has
 - `has(key)` - Check whether a record exists, returns boolean value

#### Keys
 - `keys()` - Returns an array of all storage keys

#### Empty
 - `empty()` - Empty storage (remove all key/value pairs)


Example:
=========
```javascript
Meteor.storage.set('locale', 'en'); //true
Meteor.storage.set('country', 'usa'); //true
Meteor.storage.set('gender', 'male'); //true

Meteor.storage.get('gender'); //male

Meteor.storage.has('locale'); //true
Meteor.storage.has('city'); //false

Meteor.storage.keys(); //['locale', 'country', 'gender']

Meteor.storage.remove('locale'); //true
Meteor.storage.get('locale'); //null

Meteor.storage.keys(); //['country', 'gender']

Meteor.storage.empty(); //true
Meteor.storage.keys(); //[]

Meteor.storage.empty(); //false
```