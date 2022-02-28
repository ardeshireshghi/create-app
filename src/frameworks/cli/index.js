const { Command } = require('commander');
const readline = require('readline');
const execCreateCommand = require('./exec-create-command');

const version = require('../../../package.json');

function createReadlineInterface() {
  const rl = readline.createInterface(process.stdin, process.stdout);

  // A bit of hackery (can be removed)
  const originalQuestion = rl.question.bind(rl);

  rl.question = (query) =>
    new Promise((resolve, reject) => {
      rl.once('error', reject);
      originalQuestion(query, (result) => {
        rl.removeListener('error', reject);
        resolve(result);
      });
    });

  return rl;
}

async function promptUser(rl, questionText) {
  let result = '';
  while (!result) {
    result = await rl.question(questionText);
  }

  return result;
}

async function cliHandler(options) {
  let { name, type } = options;
  let rl;

  if (!name) {
    rl = rl ?? createReadlineInterface();
    name = await promptUser(rl, 'Please specify the name of the app: ');
  }

  if (!type) {
    rl = rl ?? createReadlineInterface();
    type = await promptUser(
      rl,
      'Please specify the type of the app (Possible values: "react" "nextjs"): '
    );
  }

  if (rl) {
    rl.close();
  }

  await execCreateCommand(name, type);
}

function createCliApp() {
  const appCli = new Command();

  appCli
    .name('create-app')
    .description('CLI for creating web app boilerplates')
    .version(version);

  appCli
    .command('create')
    .description('creates a new app with configuration')
    .option('-n, --name [name-of-app]', 'Name of the app')
    .option('-t, --type [app-type]', 'Type of app')
    .action(cliHandler);

  return appCli;
}

module.exports = createCliApp;
