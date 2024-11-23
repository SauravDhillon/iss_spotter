const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work", error);
    return;
  }

  console.log("It worked! Returned IP:", ip);
  fetchCoordsByIP(ip, (error, coord) => {
    if (error) {
      console.log("It didn't work fetching coordinates", error);
      return;
    }
    console.log("Here are your geopolitical coordinates", coord);
  });
});
