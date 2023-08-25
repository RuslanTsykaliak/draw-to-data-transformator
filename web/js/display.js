// Function to create a row of samples in a container
function createRow(container, studentName, samples) {
  // Create a new div element for the row
  const row = document.createElement("div")
  row.classList.add("row") // Apply a CSS class for styling
  container.appendChild(row) // Append the row to the provided container

  // Create a label for the row with the student's name
  const rowLabel = document.createElement("div")
  rowLabel.innerHTML = studentName // Set the student's name as content
  rowLabel.classList.add("rowLabel") // Apply a CSS class for styling
  row.appendChild(rowLabel) // Append the label to the row

  // Loop through each sample in the samples array
  for (let sample of samples) {
    const { id, label, student_id } = sample

    // Create a container for each sample
    const sampleContainer = document.createElement("div")
    sampleContainer.id = "sample_" + id // Set a unique ID for the container
    sampleContainer.classList.add("sampleContainer") // Apply a CSS class for styling

    // Create a label for the sample with its content
    const sampleLabel = document.createElement("div")
    sampleLabel.innerHTML = label // Set the sample's label as content
    sampleContainer.appendChild(sampleLabel) // Append the label to the container

    // Create an image element for the sample
    const img = document.createElement("img")
    img.setAttribute("loading", "lazy") // Enable lazy loading for the image
    img.src = constants.IMG_DIR + "/" + id + ".png" // Set the image source
    img.classList.add("thumb") // Apply a CSS class for styling

    // Add blur effect to the image if the student is flagged
    if (utils.flaggedUsers.includes(student_id)) {
      img.classList.add("blur") // Apply a CSS class for styling
    }

    sampleContainer.appendChild(img) // Append the image to the container

    row.appendChild(sampleContainer) // Append the sample container to the row
  }
}
