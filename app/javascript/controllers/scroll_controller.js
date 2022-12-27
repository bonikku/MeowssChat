import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  // On start
  connect() {
    const messages = document.querySelector('#messages')
    messages.addEventListener('DOMNodeInserted', this.resetScroll)
    this.resetScroll(messages)
  }

  // On stop
  disconnect() {}

  // Custom functions
  resetScroll() {
    messages.scrollTop = messages.scrollHeight - messages.clientHeight
  }
}
