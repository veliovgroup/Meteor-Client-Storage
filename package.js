Package.describe({
  name: 'ostrio:cstorage',
  version: '0.0.1',
  summary: 'Boilerplate Client storage functions, localStorage with fall-back to Cookies',
  git: '',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.1');
  api.use('coffeescript', ['client', 'server']);
  api.use('localstorage', 'client');
  api.use('ostrio:cookies', 'client');
  api.addFiles('ostrio:cstorage.coffee', 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('ostrio:jsextensions', 'client');
  api.use('ostrio:cookies', 'client');
  api.use('ostrio:cstorage', 'client');
  api.use('coffeescript', ['client', 'server']);
  api.addFiles('ostrio:cstorage-tests.js', 'client');
});
