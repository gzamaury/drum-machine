import DrumPad from "../DrumPad/DrumPad";
import icons from "../DrumPad/icons";
import samples from "../DrumPad/samples";
import DMDisplay from "../DMDisplay/DMDisplay";
import "./DrumMachine.css";

function DrumMachine() {
  return (
    <div className="dm-container">
      <div id="drum-machine">
        <DMDisplay />
        <div className="pads-container">
          <DrumPad
            padId="heater-1"
            keyChar="Q"
            audioClip={samples["heater-1"]}
            icon={icons["heater-1"]}
          />
          <DrumPad
            padId="heater-2"
            keyChar="W"
            audioClip={samples["heater-2"]}
            icon={icons["heater-2"]}
          />
          <DrumPad
            padId="heater-3"
            keyChar="E"
            audioClip={samples["heater-3"]}
            icon={icons["heater-3"]}
          />
          <DrumPad
            padId="heater-4"
            keyChar="A"
            audioClip={samples["heater-4"]}
            icon={icons["heater-4"]}
          />
          <DrumPad
            padId="clap"
            keyChar="S"
            audioClip={samples.clap}
            icon={icons.clap}
          />
          <DrumPad
            padId="open-hh"
            keyChar="D"
            audioClip={samples["open-hh"]}
            icon={icons["open-hh"]}
          />
          <DrumPad
            padId="kick-n-hat"
            keyChar="Z"
            audioClip={samples["kick-n-hat"]}
            icon={icons["kick-n-hat"]}
          />
          <DrumPad
            padId="kick"
            keyChar="X"
            audioClip={samples.kick}
            icon={icons.kick}
          />
          <DrumPad
            padId="closed-hh"
            keyChar="C"
            audioClip={samples["closed-hh"]}
            icon={icons["closed-hh"]}
          />
        </div>
      </div>
    </div>
  );
}

export default DrumMachine;
