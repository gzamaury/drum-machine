import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { listenTo, stopListen } from "../../utils/customEvent";
import "./DMDisplay.css";

function DMDisplay({ innerText }) {
  const [text, setText] = useState(innerText);
  const [icon, setIcon] = useState();

  useEffect(() => {
    const playListener = (event) => {
      setText(event.detail.source.id.replace(/-/g, " "));
      setIcon(event.detail.icon);
    };

    listenTo("playSample", playListener);

    return () => {
      stopListen("playSample", playListener);
    };
  }, []);

  return (
    <div className="display-container">
      <div id="display">
        {icon && (
          <div className="section">
            <img src={icon} className="icon" alt="Drum pad icon" />
          </div>
        )}
        <div className="section size-2x">
          <span className="text">{text}</span>
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
