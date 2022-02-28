// TODO: Add all the env variables here
const environment = {
  debug: false
};

if (process.env.NODE_ENV === 'development') {
  environment.debug = true;
}

module.exports = environment;
