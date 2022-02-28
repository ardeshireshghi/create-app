const path = require('path');
const copy = require('recursive-copy');

const BASE_TEMPLATE_PATH = path.resolve(
  __dirname,
  '../../application/templates'
);

class TemplateInstaller {
  constructor(templateName) {
    this.templateName = templateName;
  }
  async install(targetPath) {
    await copy(`${BASE_TEMPLATE_PATH}/${this.templateName}`, targetPath);
  }
}

module.exports = TemplateInstaller;
