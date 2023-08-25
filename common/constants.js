// Create an object to hold constant values
const constants = {}

// Define paths using constant values for various directories and files
constants.DATA_DIR = "../data" // Directory for data files
constants.RAW_DIR = constants.DATA_DIR + "/raw" // Subdirectory for raw data
constants.DATASET_DIR = constants.DATA_DIR + "/dataset" // Subdirectory for dataset
constants.JSON_DIR = constants.DATASET_DIR + "/json" // Subdirectory for JSON data
constants.IMG_DIR = constants.DATASET_DIR + "/img" // Subdirectory for images
constants.SAMPLES = constants.DATASET_DIR + "/samples.json" // Path to samples JSON file
constants.JS_OBJECTS = "../common/js_objects" // Directory for common JavaScript objects
constants.SAMPLES_JS = constants.JS_OBJECTS + "/samples.js" // Path to samples.js file

// Export the constants object if the code is being used as a Node.js module
if (typeof module !== "undefined") {
  module.exports = constants
}
