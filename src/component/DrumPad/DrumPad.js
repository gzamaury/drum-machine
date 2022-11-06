/* eslint-disable jsx-a11y/media-has-caption */
import PropTypes from "prop-types";
import { useRef, useEffect } from "react";
import "./DrumPad.css";

function DrumPad({ padId, keyChar, audioClip, icon }) {
  const sample = useRef();
  const pad = useRef();

  useEffect(() => {
    const sampleRef = sample.current;
    const padRef = pad.current;

    const playSample = () => {
      sampleRef.play();
    };
    const KeyListener = (event) => {
      if (keyChar.toUpperCase() === event.key.toUpperCase()) {
        playSample();
      }
    };

    window.addEventListener("keydown", KeyListener);
    padRef.addEventListener("click", playSample);

    return () => {
      window.removeEventListener("keydown", KeyListener);
      padRef.removeEventListener("click", playSample);
    };
  }, [keyChar, audioClip]);

  return (
    <div className="dp-container">
      <div ref={pad} className="drum-pad" id={padId}>
        <span>{keyChar.toUpperCase()}</span>
        <img src={icon} className="icon" alt="Drum pad icon" />
        <audio
          ref={sample}
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
