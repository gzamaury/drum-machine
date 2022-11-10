/* eslint-disable jsx-a11y/media-has-caption */
import PropTypes from "prop-types";
import { useRef, useEffect, useContext } from "react";
import "./DrumPad.css";
import AudioContext from "../AudioContext/AudioContext";
import {
  getBufferFromAudioElement,
  createSourceNodeFrom,
} from "../../utils/AudioAPI";

function DrumPad({ padId, keyChar, audioClip, icon }) {
  const sampleRef = useRef();
  const padRef = useRef();
  const audioContext = useContext(AudioContext);
  const bufferRef = useRef();
  const trackRef = useRef();

  useEffect(() => {
    function prepareTrack() {
      trackRef.current = createSourceNodeFrom(bufferRef.current, audioContext);
      trackRef.current.connect(audioContext.destination);
    }

    getBufferFromAudioElement(sampleRef.current, audioContext).then(
      (buffer) => {
        bufferRef.current = buffer;
        prepareTrack();
      }
    );
  }, [audioClip, audioContext]);

  useEffect(() => {
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
  }, [keyChar, audioClip, audioContext]);

  return (
    <div className="dp-container">
      <div ref={padRef} className="drum-pad" id={padId}>
        <span>{keyChar.toUpperCase()}</span>
        <img src={icon} className="icon" alt="Drum pad icon" />
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

DrumPad.propTypes = {
  padId: PropTypes.string.isRequired,
  keyChar: PropTypes.string.isRequired,
  audioClip: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default DrumPad;
