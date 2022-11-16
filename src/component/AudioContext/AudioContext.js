import React from "react";

const AudioContextConstructor =
  window.AudioContext || window.webkitAudioContext;

const audioContextInstance = new AudioContextConstructor();
const AudioContext = React.createContext(audioContextInstance);

export default AudioContext;
