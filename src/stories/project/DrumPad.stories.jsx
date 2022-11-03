import DrumPad from "../../component/DrumPad/DrumPad";

export default {
  title: "Project/DrumPad",
  component: DrumPad,
};

const Template = (args) => <DrumPad {...args} />;

export const Default = Template.bind({});
Default.args = {
  padId: "heater-1",
  keyChar: "Q",
  audioClip: "./samples/heater-1.mp3",
};
