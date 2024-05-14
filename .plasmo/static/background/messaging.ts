// @ts-nocheck
globalThis.__plasmoInternalPortMap = new Map()

import { default as messagesBackgroundCrosNotionImage } from "~background/messages/background-cros-notion-image"
import { default as messagesBackgroundGetSpaces } from "~background/messages/background-get-spaces"
import { default as messagesBackgroundNotionSearch } from "~background/messages/background-notion-search"

chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
  switch (request.name) {
    case "background-cros-notion-image":
  messagesBackgroundCrosNotionImage({
    sender,
    ...request
  }, {
    send: (p) => sendResponse(p)
  })
  break
case "background-get-spaces":
  messagesBackgroundGetSpaces({
    sender,
    ...request
  }, {
    send: (p) => sendResponse(p)
  })
  break
case "background-notion-search":
  messagesBackgroundNotionSearch({
    sender,
    ...request
  }, {
    send: (p) => sendResponse(p)
  })
  break
    default:
      break
  }

  return true
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.name) {
    case "background-cros-notion-image":
  messagesBackgroundCrosNotionImage({
    sender,
    ...request
  }, {
    send: (p) => sendResponse(p)
  })
  break
case "background-get-spaces":
  messagesBackgroundGetSpaces({
    sender,
    ...request
  }, {
    send: (p) => sendResponse(p)
  })
  break
case "background-notion-search":
  messagesBackgroundNotionSearch({
    sender,
    ...request
  }, {
    send: (p) => sendResponse(p)
  })
  break
    default:
      break
  }

  return true
})

chrome.runtime.onConnect.addListener(function(port) {
  globalThis.__plasmoInternalPortMap.set(port.name, port)
  port.onMessage.addListener(function(request) {
    switch (port.name) {
      
      default:
        break
    }
  })
})

