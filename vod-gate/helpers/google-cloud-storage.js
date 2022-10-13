const {Storage} = require('@google-cloud/storage')

const GOOGLE_CLOUD_PROJECT_ID = 'cloud-tickets'; // Replace with your project ID
const GOOGLE_CLOUD_KEYFILE = './cloud-tickets-3276b00f7a24.json'; // Replace with the path to the downloaded private key

exports.storage = new Storage({
    projectId: GOOGLE_CLOUD_PROJECT_ID,
    keyFilename: GOOGLE_CLOUD_KEYFILE,
});

/**
 * Get public URL of a file. The file must have public access
 * @param {string} bucketName
 * @param {string} fileName
 * @return {string}
 */
exports.getPublicUrl = (fileName) => `http://35.186.236.211/${fileName}`;

