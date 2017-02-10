const fs = require('fs-extra');
const Git = require('simple-git')();
const repository = process.argv[process.argv.indexOf('--repository') + 1];
const build = process.argv[process.argv.indexOf('--build') + 1];

fs.ensureDir('static');
fs.copy(build, 'static', function (err) {
  if (err) return console.error(err);
  console.log('Static folder prepared');
  Git
    .add('static')
    //.stash([])
    .commit('deploy:stage', ['static'])
    .push(['-f', repository, 'new_version'], function(err, data) {
    })
    //.reset(['--hard', 'HEAD~1'])
    //.stash(['apply']);
});