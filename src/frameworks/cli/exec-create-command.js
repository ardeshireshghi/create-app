const { App, AppTypes } = require('../../domain/App');
const ReactAppCreateService = require('../services/ReactAppCreateService');

const {
  createCommand: createFrontEndAppCommand
} = require('../../interface-adapters/commands/CreateFrontEndAppCommand');
const WebpackConfigManager = require('../services/webpack-config/WebpackConfigManager');
const TemplateInstaller = require('../services/TemplateInstaller');

async function execCreateCommand(newAppName, appType) {
  if (appType === AppTypes.REACT) {
    const app = new App(newAppName, appType, 'react');
    const createAppCommand = createFrontEndAppCommand(
      app,
      new ReactAppCreateService(
        new WebpackConfigManager(),
        new TemplateInstaller(app.templatePath)
      )
    );

    await createAppCommand.run();
  } else {
    throw new Error('have not implemented Next.js yet');
  }
}

module.exports = execCreateCommand;
