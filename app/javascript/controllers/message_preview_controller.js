import { Controller } from "@hotwired/stimulus"

//This controller is responsible for displaying the message previews
export default class extends Controller {
  connect() {}

  // Creates preview panel above message input
  preview() {
    this.clearPreviews()
    for (let i = 0; i < this.targets.element.files.length; i++) {
      let file = this.targets.element.files[i]
      const reader = new FileReader()
      this.createAndDisplayFilePreviewElements(file, reader)
    }
  }
  // @param {*} file - File to be previewed, @param {*} reader - The FileReader object
  createAndDisplayFilePreviewElements(file, reader) {
    reader.onload = () => {
      let element = this.constructPreviews(file, reader)
      element.src = reader.result
      element.setAttribute("href", reader.result)
      element.setAttribute("target", "_blank")
      element.classList.add("attachment-preview")

      document.querySelector("#attachment-previews").appendChild(element)
    }
    reader.readAsDataURL(file)
  }
  // Audio: mp3, wav | Video: mp4, quicktime | Image: jpg, png, gif | Default: anything else
  constructPreviews(file, reader) {
    let element
    let cancelFunction = (e) => this.removePreview(e)
    switch (file.type) {
      case "image/jpeg":
      case "image/png":
      case "image/gif":
        element = this.createImageElement(cancelFunction, reader)
        break
      case "video/mp4":
      case "video/quicktime":
        element = this.createVideoElement(cancelFunction)
        break
      case "audio/mpeg":
      case "audio/mp3":
      case "audio/wav":
        element = this.createAudioElement(cancelFunction)
        break
      default:
        element = this.createDefaultElement(cancelFunction)
    }
    element.dataset.filename = file.name
    return element
  }
  // For images
  createImageElement(cancelFunction, reader) {
    let cancelUploadButton, element
    const image = document.createElement("img")
    image.setAttribute("style", "background-image: url(" + reader.result + ")")
    image.classList.add("preview-image")
    element = document.createElement("div")
    element.classList.add("attachment-image-container", "file-removal")
    element.appendChild(image)
    cancelUploadButton = document.createElement("i")
    cancelUploadButton.classList.add(
      "bi",
      "bi-x-circle-fill",
      "cancel-upload-button"
    )
    cancelUploadButton.onclick = cancelFunction
    element.appendChild(cancelUploadButton)
    return element
  }
  // For audio
  createAudioElement(cancelFunction) {
    let cancelUploadButton, element
    element = document.createElement("i")
    element.classList.add(
      "bi",
      "bi-file-earmark-music-fill",
      "audio-preview-icon",
      "file-removal"
    )
    cancelUploadButton = document.createElement("i")
    cancelUploadButton.classList.add(
      "bi",
      "bi-x-circle-fill",
      "cancel-upload-button"
    )
    cancelUploadButton.onclick = cancelFunction
    element.appendChild(cancelUploadButton)
    return element
  }
  // For video
  createVideoElement(cancelFunction) {
    let cancelUploadButton, element
    element = document.createElement("i")
    element.classList.add(
      "bi",
      "bi-file-earmark-play-fill",
      "video-preview-icon",
      "file-removal"
    )
    cancelUploadButton = document.createElement("i")
    cancelUploadButton.classList.add(
      "bi",
      "bi-x-circle-fill",
      "cancel-upload-button"
    )
    cancelUploadButton.onclick = cancelFunction
    element.appendChild(cancelUploadButton)
    return element
  }
  // For anything else
  createDefaultElement(cancelFunction) {
    let cancelUploadButton, element
    element = document.createElement("i")
    element.classList.add(
      "bi",
      "bi-file-check-fill",
      "file-preview-icon",
      "file-removal"
    )
    cancelUploadButton = document.createElement("i")
    cancelUploadButton.classList.add(
      "bi",
      "bi-x-circle-fill",
      "cancel-upload-button"
    )
    cancelUploadButton.onclick = cancelFunction
    element.appendChild(cancelUploadButton)
    return element
  }
  // Removes selected element, uses dataTransfer to circumvent fileList limitations
  removePreview(event) {
    const target = event.target.parentNode.closest(".attachment-preview")
    const dataTransfer = new DataTransfer()
    let fileInput = document.querySelector("#message_attachments")
    let files = fileInput.files
    let filesArray = Array.from(files)

    filesArray = filesArray.filter((file) => {
      let filename = target.dataset.filename
      return file.name !== filename
    })
    target.parentNode.removeChild(target)
    filesArray.forEach((file) => dataTransfer.items.add(file))
    fileInput.files = dataTransfer.files
  }
  // Clear previews after sending
  clearPreviews() {
    document.getElementById("attachment-previews").innerHTML = ""
  }
}
