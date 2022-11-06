import DrumPad from "../../component/DrumPad/DrumPad";
import icons from "../../component/DrumPad/icons";
import samples from "../../component/DrumPad/samples";

export default {
  title: "Project/DrumPad",
  component: DrumPad,
  argTypes: {
    padId: {
      table: {
        disable: true,
      },
    },
    keyChar: {
      options: ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"],
      control: "select",
    },
    audioClip: {
      options: Object.keys(samples),
      mapping: samples,
      control: "select",
    },
    icon: {
      options: Object.keys(icons),
      mapping: icons,
      control: "select",
    },
  },
};

const Template = (args) => <DrumPad {...args} />;

export const Default = Template.bind({});
Default.args = {
  padId: "heater-1",
  keyChar: "Q",
  audioClip: samples["heater-1"],
  icon: icons["heater-1"],
};
