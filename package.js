Package.describe({
  name: 'ostrio:cstorage',
  version: '2.0.6',
  summary: 'Bulletproof persistent Client storage, works with disabled Cookies and/or localStorage',
  git: 'https://github.com/VeliovGroup/Meteor-Client-Storage',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.4');
  api.use(['ecmascript', 'coffeescript', 'ostrio:cookies@2.0.5'], 'client');
  api.mainModule('cstorage.coffee', 'client');
  api.export('ClientStorage', 'client');
  api.export('clientStorage', 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use(['ecmascript', 'coffeescript', 'ostrio:cstorage'], 'client');
  api.addFiles('cstorage-tests.js', 'client');
});
