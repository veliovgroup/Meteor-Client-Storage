Package.describe({
  name: 'ostrio:cstorage',
  version: '1.0.0',
  summary: 'Boilerplate Client storage functions, localStorage with fall-back to Cookies',
  git: 'https://github.com/VeliovGroup/Meteor-Client-Storage',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.use(['coffeescript', 'localstorage', 'ostrio:cookies@1.0.0'], 'client');
  api.addFiles('cstorage.coffee', 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use(['coffeescript', 'ostrio:jsextensions@0.0.4', 'ostrio:cstorage@1.0.0'], 'client');
  api.addFiles('cstorage-tests.js', 'client');
});
