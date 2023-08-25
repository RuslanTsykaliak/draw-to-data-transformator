// Create an object to hold utility functions
const utils = {}

// Define an array of flagged user IDs
utils.flaggedUsers = [1663882102141, 1663900040545, 1664485938220]

// Define a utility function to format a number as a percentage
utils.formatPercent = (n) => {
  return (n * 100).toFixed(2) + "%"
}

// Define a utility function to print progress in the console
utils.printProgress = (count, max) => {
  process.stdout.clearLine() // Clear the current line in the console
  process.stdout.cursorTo(0) // Move the cursor to the beginning of the line
  const percent = utils.formatPercent(count / max) // Calculate and format the percentage
  process.stdout.write(count + "/" + max + " (" + percent + ")") // Write progress information
}

// Define a utility function to group an array of objects by a specific key
utils.groupBy = (objArray, key) => {
  const groups = {}
  for (let obj of objArray) {
    const val = obj[key]
    if (groups[val] == null) {
      groups[val] = []
    }
    groups[val].push(obj)
  }
  return groups
}

// Export the utils object if the code is being used as a Node.js module
if (typeof module !== "undefined") {
  module.exports = utils
}
