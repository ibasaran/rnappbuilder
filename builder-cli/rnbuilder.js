const { program } = require('commander');
var rnAppGenerator = require('./generator/rnGenerator');

program.version('0.1');

program
  .option('-c, --create', 'Create new project')
  .option('-u, --update', 'Updates templates')
  .option('-n, --name [appname]', 'New project name')
  .option('-j, --json [path]', 'Json file full path');
 
program.parse(process.argv);


if (program.create) {
    rnAppGenerator.generate(true, program.name, program.json);
} else if (program.update) {
    rnAppGenerator.generate(false, program.name, program.json);
}


