function getImageTags(imageData) {
	return new Promise(function(resolve, reject) {
  	const vision = require("@google-cloud/vision");
    const client = new vision.ImageAnnotatorClient({
    	keyFilename: "./API_KEY.json",
    });

    const objectTags = [];

		client
      	.objectLocalization(imageData)
    		.then((results) => {
        	const [result] = results;
        	const objects = result.localizedObjectAnnotations;

        	console.log(result);
        	console.log(objects);

        	objects.forEach((object) => {
          	objectTags.push(object.name.toLowerCase());
        	});

        	resolve(objectTags);
      	})
      	.catch((error) => reject(error));
  });
}

module.exports = getImageTags;
