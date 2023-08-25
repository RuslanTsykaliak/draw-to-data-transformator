// Define a class for creating a sketch pad
class SketchPad {
  constructor(container, size = 400) {
    // Create a canvas element and set its size
    this.canvas = document.createElement("canvas")
    this.canvas.width = size
    this.canvas.height = size

    // Set canvas styles for background and shadow
    this.canvas.style.backgroundColor = "white"
    this.canvas.style.boxShadow = "0px 0px 10px 2px black"

    // Append canvas to the provided container
    container.appendChild(this.canvas)

    // Create a line break element and append it to the container
    const lineBreak = document.createElement("br")
    container.appendChild(lineBreak)

    // Create an "UNDO" button element and append it to the container
    this.undoBtn = document.createElement("button")
    this.undoBtn.textContent = "UNDO"
    container.appendChild(this.undoBtn)

    // Get the 2D rendering context of the canvas
    this.ctx = this.canvas.getContext("2d")

    // Initialize paths and drawing state, then redraw the canvas
    this.reset()

    // Add event listeners to set up drawing functionality
    this.addEventListeners()
  }

  // Method to reset the drawing state and clear the canvas
  reset() {
    this.paths = []
    this.isDrawing = false
    this.redraw()
  }

  // Method to add event listeners for drawing interactions
  addEventListeners() {
    // Set up mouse down event handler
    this.canvas.onmousedown = (evt) => {
      const mouse = this.getMouse(evt)
      this.paths.push([mouse])
      this.isDrawing = true
    }

    // Set up mouse move event handler
    this.canvas.onmousemove = (evt) => {
      if (this.isDrawing) {
        const mouse = this.getMouse(evt)
        const lastPath = this.paths[this.paths.length - 1]
        lastPath.push(mouse)
        this.redraw()
      }
    }

    // Set up mouse up event handler
    document.onmouseup = () => {
      this.isDrawing = false
    }

    // Set up touch start event handler
    this.canvas.ontouchstart = (evt) => {
      const loc = evt.touches[0]
      this.canvas.onmousedown(loc)
    }

    // Set up touch move event handler
    this.canvas.ontouchmove = (evt) => {
      const loc = evt.touches[0]
      this.canvas.onmousemove(loc)
    }

    // Set up touch end event handler
    document.ontouchend = () => {
      document.onmouseup()
    }

    // Set up undo button click event handler
    this.undoBtn.onclick = () => {
      this.paths.pop()
      this.redraw()
    }
  }

  // Method to redraw the canvas with the current paths
  redraw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    draw.paths(this.ctx, this.paths)

    // Disable the undo button if there are no paths
    this.undoBtn.disabled = this.paths.length === 0
  }

  // Method to get the mouse coordinates relative to the canvas
  getMouse = (evt) => {
    const rect = this.canvas.getBoundingClientRect()
    return [
      Math.round(evt.clientX - rect.left),
      Math.round(evt.clientY - rect.top),
    ]
  }
}
