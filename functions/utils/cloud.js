const vision = require("@google-cloud/vision");
const path = require("path");

const client = new vision.ImageAnnotatorClient({
  keyFilename: path.resolve(__dirname, "API_KEY.json"),
});

/* eslint-disable indent */
/* eslint-disable require-jsdoc */
function getImageTags(imageData) {
  return new Promise(function (resolve, reject) {
    const objectTags = [];

    client
      .objectLocalization(imageData)
      .then((results) => {
        const [result] = results;
        const objects = result.localizedObjectAnnotations;

        console.log("Results: ", result);
        console.log(objects);

        objects.forEach((object) => {
          objectTags.push(object.name.toLowerCase());
        });

        resolve(objectTags);
      })
      .catch((error) => reject(error));
  });
}

module.exports = {
  getImageTags,
};
