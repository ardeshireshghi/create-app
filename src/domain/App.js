const AppTypes = {
  REACT: 'react',
  NEXTJS: 'nextjs'
};

class App {
  constructor(name, type = AppTypes.REACT) {
    this.name = name;
    this.type = type;
  }
}

exports.AppTypes = AppTypes;
exports.App = App;
