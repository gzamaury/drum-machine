function dispatchCustomEvent(eventType, data) {
  const event = new CustomEvent(eventType, { detail: data });
  document.dispatchEvent(event);
}

function listenTo(eventType, listener) {
  document.addEventListener(eventType, listener);
}

function stopListen(eventType, listener) {
  document.removeEventListener(eventType, listener);
}

export { dispatchCustomEvent, listenTo, stopListen };
