export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <div
      style={{
        display: "inline-flex",
        padding: "1.5em",
        backgroundColor: "rgba(0, 118 , 255, 100)",
      }}
    >
      <Story />
    </div>
  ),
];
