/* eslint-disable jsx-a11y/media-has-caption */
import PropTypes from "prop-types";
import { useRef, useEffect } from "react";

function DrumPad({ padId, keyChar, audioClip }) {
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
    <div className=".drum-pad" id={padId}>
      <div ref={pad}>
        <span>{keyChar.toUpperCase()}</span>
        <audio ref={sample} className="clip" id={keyChar.toUpperCase()}>
          <source src={audioClip} />
        </audio>
      </div>
    </div>
  );
}

DrumPad.propTypes = {
  padId: PropTypes.string.isRequired,
  keyChar: PropTypes.string.isRequired,
  audioClip: PropTypes.string.isRequired,
};

export default DrumPad;
