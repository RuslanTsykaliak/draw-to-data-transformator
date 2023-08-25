// Define a namespace for drawing-related functions and methods
const draw = {}

// Define a function to draw a single path on the canvas
draw.path = (ctx, path, color = "black") => {
  // Set the stroke color for the path
  ctx.strokeStyle = color

  // Set the line width for the path
  ctx.lineWidth = 3

  // Begin a new path
  ctx.beginPath()

  // Move the drawing cursor to the starting point of the path
  ctx.moveTo(...path[0])

  // Loop through each point in the path and connect them with lines
  for (let i = 1; i < path.length; i++) {
    ctx.lineTo(...path[i])
  }

  // Set the line cap style to round for smoother path endings
  ctx.lineCap = "round"

  // Set the line join style to round for smoother path intersections
  ctx.lineJoin = "round"

  // Draw the path on the canvas using strokes
  ctx.stroke()
}

// Define a function to draw multiple paths on the canvas
draw.paths = (ctx, paths, color = "black") => {
  // Loop through each path and draw it using the draw.path function
  for (const path of paths) {
    draw.path(ctx, path, color)
  }
}

if (typeof module !== "undefined") {
  module.exports = draw
}
