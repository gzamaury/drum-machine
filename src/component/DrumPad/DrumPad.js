/* eslint-disable jsx-a11y/media-has-caption */
import PropTypes from "prop-types";
import { useRef, useEffect, useContext, useState } from "react";
import "./DrumPad.css";
import AudioContext from "../AudioContext/AudioContext";
import {
  getBufferFromAudioElement,
  createSourceNodeFrom,
} from "../../utils/AudioAPI";
import icons from "./icons";

function DrumPad({ padId, keyChar, audioClip, icon }) {
  const sampleRef = useRef();
  const padRef = useRef();
  const audioContext = useContext(AudioContext);
  const bufferRef = useRef();
  const trackRef = useRef();
  const [status, setStatus] = useState("buffering");

  useEffect(() => {
    const track = trackRef.current;
    function prepareTrack() {
      trackRef.current = createSourceNodeFrom(bufferRef.current, audioContext);
      trackRef.current.connect(audioContext.destination);
    }

    getBufferFromAudioElement(sampleRef.current, audioContext).then(
      (buffer) => {
        bufferRef.current = buffer;
        prepareTrack();
        setStatus("ready");
      }
    );

    return () => {
      if (track !== trackRef.current) {
        setStatus("buffering");
      }
    };
  }, [audioClip, audioContext]);

  useEffect(() => {
    if (status !== "ready") {
      return () => {};
    }

    const pad = padRef.current;

    function prepareTrack() {
      trackRef.current = createSourceNodeFrom(bufferRef.current, audioContext);
      trackRef.current.connect(audioContext.destination);
    }

    const playTrack = () => {
      console.log("playing...");
      if (audioContext.state === "suspended") {
        audioContext.resume();
      }
      trackRef.current.start();
      prepareTrack();
    };

    const KeyListener = (event) => {
      if (keyChar.toUpperCase() === event.key.toUpperCase()) {
        playTrack();
      }
    };

    window.addEventListener("keydown", KeyListener);
    pad.addEventListener("click", playTrack);

    return () => {
      window.removeEventListener("keydown", KeyListener);
      pad.removeEventListener("click", playTrack);
    };
  }, [keyChar, audioClip, audioContext, status]);

  return (
    <div className="dp-container">
      <div ref={padRef} className="drum-pad" id={padId}>
        <span>{keyChar.toUpperCase()}</span>
        <img
          src={status === "buffering" ? icons.loading : icon}
          className="icon"
          alt="Drum pad icon"
        />
        <audio
          ref={sampleRef}
          src={audioClip}
          className="clip"
          id={keyChar.toUpperCase()}
        />
      </div>
    </div>
  );
}

// eslint-disable-next-line consistent-return
function oneCharValidator(props, propName, componentName) {
  if (!/^[a-z]{1}$/i.test(props[propName])) {
    return new Error(
      `Invalid prop ${propName} supplied to ${componentName}. Validation failed.`
    );
  }
}

DrumPad.propTypes = {
  padId: PropTypes.string.isRequired,
  keyChar: PropTypes.oneOfType([oneCharValidator]).isRequired,
  audioClip: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default DrumPad;
