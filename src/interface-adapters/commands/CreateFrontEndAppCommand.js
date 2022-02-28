const { BaseCommand } = require('./BaseCommand');
const createFrontendApp = require('../../application/use-cases/createFrontendApp');

class CreateFrontEndAppCommand extends BaseCommand {
  constructor({ app, frontendAppCreator }) {
    super();
    this.app = app;
    this.frontendAppCreator = frontendAppCreator;
  }

  async run() {
    this.emit('started');

    try {
      await createFrontendApp({
        name: this.app.name,
        frontendAppCreator: this.frontendAppCreator
      });
      this.emit('finished');
    } catch (err) {
      this.emit('error', err);
    }
  }
}

/**
 *
 * @param {App} app
 * @param {FrontEndAppCreator} frontendAppCreator
 * @returns CreateFrontEndAppCommand
 */
exports.createCommand = (app, frontendAppCreator) => {
  return new CreateFrontEndAppCommand({
    app,
    frontendAppCreator
  });
};
