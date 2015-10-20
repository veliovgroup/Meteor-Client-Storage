Package.describe({
  name: 'ostrio:cstorage',
  version: '2.0.1',
  summary: 'Boilerplate Client storage functions, localStorage with fall-back to Cookies',
  git: 'https://github.com/VeliovGroup/Meteor-Client-Storage',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.use(['coffeescript', 'localstorage', 'ostrio:cookies@2.0.1'], 'client');
  api.addFiles('cstorage.coffee', 'client');
  api.export('ClientStorage');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use(['coffeescript', 'ostrio:cstorage'], 'client');
  api.addFiles('cstorage-tests.js', 'client');
});
