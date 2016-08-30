var convict = require('convict');

// Define a schema
var conf = convict({
  env: {
    doc: "The applicaton environment.",
    format: ["production", "development", "test"],
    default: "development",
    env: "NODE_ENV"
  },
  mongo: {
    doc: "The mongo database connection string.",
    format: "*",
    default: "mongodb://localhost:27017/todobackend",
    env: "MONGO",
  },
  port: {
    doc: "The port to bind.",
    format: "port",
    default: 8080,
    env: "PORT"
  }
});

// Load environment dependent configuration
var env = conf.get('env');
conf.loadFile( './config/' + env + '.json');

// Perform validation
conf.validate({strict: true});

module.exports = conf;