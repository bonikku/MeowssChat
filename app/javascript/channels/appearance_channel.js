import consumer from 'channels/consumer'

let indexPage
let resetFunction
let timer = 0

consumer.subscriptions.create('AppearanceChannel', {
  initialized() {},

  connected() {
    resetFunction = () => this.resetTimer(this.uninstall)
    this.install()
    window.addEventListener('turbo:load', () => this.resetTimer())
  },

  disconnected() {
    this.uninstall()
  },

  rejected() {
    this.uninstall()
  },

  received(data) {
    // Called when there's incoming data on the websocket for this channel
  },

  online() {
    this.perform('online')
  },

  away() {
    this.perform('away')
  },

  offline() {
    console.log('offline')
    this.perform('offline')
  },

  uninstall() {
    indexPage = document.querySelector('#appearance_channel')
    if (!indexPage) {
      clearTimeout(timer)
      this.perform('offline')
    }
  },
  install() {
    window.removeEventListener('load', resetFunction)
    window.removeEventListener('DOMContentLoaded', resetFunction)
    window.removeEventListener('click', resetFunction)
    window.removeEventListener('keydown', resetFunction)

    window.addEventListener('load', resetFunction)
    window.addEventListener('DOMContentLoaded', resetFunction)
    window.addEventListener('click', resetFunction)
    window.addEventListener('keydown', resetFunction)

    this.resetTimer()
  },
  resetTimer() {
    this.uninstall()
    indexPage = document.querySelector('#appearance_channel')

    if (!!indexPage) {
      this.online()
      clearTimeout(timer)

      // 7 sec for development
      timer = setTimeout(this.away.bind(this), 5000)
    }
  },
})
