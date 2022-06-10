const request = require('request');

const fetchBreedDescription = function (breedName, callback) {
  request(
    `https://api.thecatapi.com/v1/breeds/search?q=${breedName}`,
    (error, response, body) => {
      // Handle request errors and print the error details to the screen. incase the URL broke
      if (error) {
        callback(error, null);
        return;
      }

      // Print the response status code if a response was received
      //console.log('statusCode:', response && response.statusCode);

      // Print the HTML for the request page
      //console.log('body:', body);

      //console.log(typeof body); // string

      //Since it is a string => hard to read and work on, use parse and print body to the console as an object
      let newBody = JSON.parse(body);

      //If breedname is invalid or cannot by found by API
      if (newBody[0] === undefined) {
        callback(
          `${breedName} cannot be found 😿😿😿! Please try a different breed name purrrrrr meowww`
        );
      }

      if (newBody[0]) {
        //Print description, the whole object is index 0 of array newBody
        callback(null, newBody[0].description);
        return;
      }
    }
  );
};
module.exports = { fetchBreedDescription };
