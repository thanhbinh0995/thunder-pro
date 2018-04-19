const redis = require('redis');
const client = redis.createClient();

//Incase any error pops up, log it
client.on("error", function(err) {
  console.log("Error " + err);
});

module.exports = client;
