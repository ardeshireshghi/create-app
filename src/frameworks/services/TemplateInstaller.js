const path = require('path');
const copy = require('recursive-copy');

const BASE_TEMPLATE_PATH = path.resolve(
  __dirname,
  '../../application/templates'
);

class TemplateInstaller {
  async install(templateName, targetPath) {
    await copy(`${BASE_TEMPLATE_PATH}/${templateName}`, targetPath);
  }
}

module.exports = TemplateInstaller;
