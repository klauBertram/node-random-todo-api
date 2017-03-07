const config = require('./config.json');

const ENV = process.env.NODE_ENV || 'development';

if(ENV === 'development' || ENV === 'test'){
  var envConfig = config[ENV];

  process.env.NODE_ENV = ENV;

  // Object.keys returns array of keys in object
  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  });
}