import PropTypes from "prop-types";
import { useEffect, useState, useRef } from "react";
import { listenTo, stopListen } from "../../utils/customEvent";
import "./DMDisplay.css";

function DMDisplay({ innerText }) {
  const [text, setText] = useState(innerText);
  const [icon, setIcon] = useState();
  const iconRef = useRef();
  const textRef = useRef();
  const timeoutIDs = useRef([]);

  function dismiss(elem) {
    elem.classList.add("dismiss");
  }

  function removeDismiss(elem) {
    elem.classList.remove("dismiss");
  }

  useEffect(() => {
    const resetDisplay = () => {
      setIcon();
      setText(() => {
        removeDismiss(textRef.current);

        return innerText;
      });
    };
    const updateText = (event) => {
      removeDismiss(textRef.current);

      return event.detail.source.id.replace(/-/g, " ");
    };
    const updateIcon = (event) => {
      if (iconRef.current) removeDismiss(iconRef.current);

      return event.detail.icon;
    };
    const dismissDisplay = () => {
      if (iconRef.current) dismiss(iconRef.current);
      dismiss(textRef.current);
    };
    const setTimers = () => {
      timeoutIDs.current.push(setTimeout(resetDisplay, 2500));
      timeoutIDs.current.push(setTimeout(dismissDisplay, 250));
    };
    const cleanTimers = () => {
      timeoutIDs.current.every((timeoutId) => clearTimeout(timeoutId));
      timeoutIDs.current = [];
    };

    const playListener = (event) => {
      cleanTimers();

      setText(updateText(event));
      setIcon(updateIcon(event));

      setTimers();
    };

    listenTo("playSample", playListener);

    return () => {
      stopListen("playSample", playListener);
    };
  }, [innerText]);

  return (
    <div className="display-container">
      <div id="display">
        {icon && (
          <div className="section">
            <img
              ref={iconRef}
              src={icon}
              className="icon"
              alt="Drum pad icon"
            />
          </div>
        )}
        <div className="section size-2x">
          <span ref={textRef} className="text">
            {text}
          </span>
        </div>
      </div>
    </div>
  );
}

DMDisplay.propTypes = {
  innerText: PropTypes.string,
};

DMDisplay.defaultProps = {
  innerText: "DM Display",
};

export default DMDisplay;
