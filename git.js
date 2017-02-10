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
    .stash([])
    .commit('deploy', ['static'])
    //.push(['-f', repository, 'master'], function(err, data) {
    //  if (err) {
    //    Git.reset(['--hard', 'HEAD~1']);
    //  }
    //})
    //.reset(['--hard', 'HEAD~1'])
    .stash(['apply']);
});