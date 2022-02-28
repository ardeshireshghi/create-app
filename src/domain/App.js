const AppTypes = {
  REACT: 'react',
  NEXTJS: 'nextjs'
};

class App {
  constructor(name, type = AppTypes.REACT, templatePath) {
    this.name = name;
    this.type = type;
    this.templatePath = templatePath;
  }
}

exports.AppTypes = AppTypes;
exports.App = App;
