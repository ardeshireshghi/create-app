const { createWriteStream, createReadStream } = require('fs');
const path = require('path');
const os = require('os');

class WebpackConfigManager {
  async createConfig(appPath) {
    return new Promise((resolve, reject) => {
      const babelRcWriter = createWriteStream(
        path.resolve(appPath, '.babelrc')
      );

      babelRcWriter.write(
        JSON.stringify(
          {
            presets: ['@babel/preset-env', '@babel/preset-react']
          },
          null,
          2
        ) + os.EOL
      );
      babelRcWriter.close();

      const targetConfigFile = createWriteStream(
        path.resolve(appPath, 'webpack.config.js')
      );

      createReadStream(__dirname + '/config/webpack.config.js.template').pipe(
        targetConfigFile
      );

      targetConfigFile.on('finish', resolve);
      targetConfigFile.on('error', reject);
    });
  }
}

module.exports = WebpackConfigManager;
