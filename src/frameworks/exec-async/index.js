const { spawn } = require('child_process');
const { cwd } = require('process');

async function execAsyncCommand(command, args, workDir) {
  return new Promise((resolve, reject) => {
    const childProcess = spawn(command, args, {
      cwd: workDir ?? cwd(),
      stdio: 'inherit'
    });

    const onExit = (code) => {
      if (code === 0) {
        resolve();
      }
    };

    const onError = (err) => {
      childProcess.removeListener('close', onExit);
      reject(err);
    };

    childProcess.once('close', onExit);
    childProcess.once('error', onError);
  });
}

module.exports = execAsyncCommand;
