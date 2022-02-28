// const { spawn, execSync } = require('child_process');
const os = require('os');
const { cwd } = require('process');
const fs = require('fs').promises;
const path = require('path');

const execAsyncCommand = require('../exec-async');
const AppCreateService = require('./AppCreateService');

class ReactAppCreateService extends AppCreateService {
  // TODO: Extract package install concerns to a package installer service
  constructor(webpackConfigManager, templateInstaller) {
    super();
    this.webpackConfigManager = webpackConfigManager;
    this.templateInstaller = templateInstaller;
  }

  async build(name) {
    if (!this._isAppNameValid(name)) {
      throw new Error('Invalid app name');
    }

    await this._createAppDirectory(name);
    await this._createPackageJson(name);
    await this.templateInstaller.install('react', path.join(cwd(), name));
    await this.webpackConfigManager.createConfig(path.join(cwd(), name));
    await this._installDependencies(name, true);
  }

  async _createAppDirectory(name) {
    try {
      await fs.mkdir(path.join(cwd(), name));
    } catch (err) {
      console.error('Error creating directory for the app', err.message);
      throw err;
    }
  }
  async _createPackageJson(appName) {
    const packageJson = {
      name: appName,
      version: '0.1.0',
      scripts: {
        start: 'npx webpack-dev-server --port 5555 --mode development'
      }
    };

    await fs.writeFile(
      path.join(cwd(), appName, 'package.json'),
      JSON.stringify(packageJson, null, 2) + os.EOL
    );
  }

  async _installDependencies(appName, useYarn = true) {
    const packageManager = useYarn ? 'yarnpkg' : 'npm';

    for (const packageName of this.dependencies) {
      await installPackage({
        name: packageName,
        packageManager,
        workDir: path.join(cwd(), appName),
        isDev: false
      });
    }

    for (const packageName of this.devDependencies) {
      await installPackage({
        name: packageName,
        packageManager,
        workDir: path.join(cwd(), appName),
        isDev: true
      });
    }
  }

  _isAppNameValid(name) {
    return !!name;
  }

  get dependencies() {
    return ['react', 'react-dom'];
  }

  get devDependencies() {
    return [
      '@babel/preset-env',
      'react-hot-loader',
      'webpack',
      'webpack-cli',
      'webpack-dev-server',
      '@babel/core',
      '@babel/preset-react',
      'babel-loader',
      'style-loader',
      'css-loader'
    ];
  }
}

async function installPackage({ name, packageManager, isDev, workDir }) {
  let command = packageManager;
  const args = [];

  if (packageManager === 'yarnpkg') {
    args.push('add');
  } else {
    args.push('install');
  }

  if (isDev) {
    args.push('-D');
  }

  args.push(name);

  await execAsyncCommand(command, args, workDir);
}

module.exports = ReactAppCreateService;
