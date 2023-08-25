// Import necessary modules and files
const draw = require("../common/draw.js") // Drawing functions
const constants = require("../common/constants.js") // Constant paths
const utils = require("../common/utils.js") // Utility functions
const { createCanvas } = require("canvas") // Canvas library for image generation
const canvas = createCanvas(400, 400) // Create a canvas of size 400x400
const ctx = canvas.getContext("2d") // Get the 2D rendering context

const fs = require("fs") // File system module

// This section clears any existing data directories if they exist
if (fs.existsSync(constants.DATASET_DIR)) {
  fs.readdirSync(constants.DATASET_DIR).forEach((fileName) =>
    fs.rmSync(constants.DATASET_DIR + "/" + fileName, { recursive: true })
  )
  fs.rmdirSync(constants.DATASET_DIR)
}

// Create necessary data directories
fs.mkdirSync(constants.DATASET_DIR)
fs.mkdirSync(constants.JSON_DIR)
fs.mkdirSync(constants.IMG_DIR)

console.log("GENERATING DATASET ...") // Log message

// Process each raw data file
const fileNames = fs.readdirSync(constants.RAW_DIR) // Get list of raw data files
const samples = [] // Initialize an array to hold sample information
let id = 1 // Initialize ID counter

// Loop through each raw data file
fileNames.forEach((fn) => {
  const content = fs.readFileSync(constants.RAW_DIR + "/" + fn) // Read raw data content
  const { session, student, drawings } = JSON.parse(content) // Parse JSON content

  // Process each drawing label for the current student and session
  for (let label in drawings) {
    samples.push({
      id,
      label,
      student_name: student,
      student_id: session,
    })

    const paths = drawings[label] // Get drawing paths
    fs.writeFileSync(
      constants.JSON_DIR + "/" + id + ".json",
      JSON.stringify(paths) // Save paths as JSON file
    )

    generateImageFile(constants.IMG_DIR + "/" + id + ".png", paths) // Generate and save image

    utils.printProgress(id, fileNames.length * 8) // Print progress
    id++
  }
})

// Save sample metadata as JSON
fs.writeFileSync(constants.SAMPLES, JSON.stringify(samples))

// Create JS object file for samples
fs.mkdirSync(constants.JS_OBJECTS, { recursive: true })
fs.writeFileSync(
  constants.SAMPLES_JS,
  "const samples=" + JSON.stringify(samples) + ";"
)

// Function to generate an image file from drawing paths
function generateImageFile(outFile, paths) {
  ctx.clearRect(0, 0, canvas.width, canvas.height) // Clear canvas

  draw.paths(ctx, paths) // Draw paths on canvas

  const buffer = canvas.toBuffer("image/png") // Convert canvas to image buffer
  fs.writeFileSync(outFile, buffer) // Save image buffer to file
}
