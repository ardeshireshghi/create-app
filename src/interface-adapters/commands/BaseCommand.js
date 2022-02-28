const { EventEmitter } = require('events');

class BaseCommand extends EventEmitter {
  constructor() {
    super();
  }

  run() {
    throw new Error('this method needs to be implemented');
  }
}

exports.BaseCommand = BaseCommand;
