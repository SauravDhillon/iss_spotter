/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const needle = require('needle');
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  needle.get("https://api.ipify.org/?format=json", (err, response, body) => {
    if (err) {
      return callback(err, null);
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }
    const ip = body.ip;
    callback(null, ip);
  });
};

module.exports = { fetchMyIP };