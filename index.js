const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');
const { fetchISSFlyOverTimes } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');

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
    fetchISSFlyOverTimes(coord, (error, flyOvertime) => {
      if (error) {
        console.log("It didn't work fetching flyOvertime", error);
        return;
      }
      console.log("Here are your flyOver Times", flyOvertime);

    });
  });
});
const printPassTimes = function(passTimes) {
  for (const pass of passTimes){
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
}
nextISSTimesForMyLocation((error, passTimes) => {
  if(error){
    return console.log("It didn't work!", error);
  }
  printPassTimes(passTimes);
});

module.exports = printPassTimes;