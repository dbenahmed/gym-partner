/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const Colors = {
  light: {
    text: "#11181C",
    background: "rgba(255, 255, 255, 1)",
    tint: "rgba(10, 126, 164, 1)",
    tintLighter: "#E3F2FD",
    tintLowOpacity: "rgba(10, 126, 164, 0.2)",
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: "rgba(10, 126, 164, 1)",
    proteinBg: "#4ECDC4",
    caloriesBg: "#FF6B6B",
    carbsBg: "#45B7D1",
    fatBg: "#FFA07A",
    green:"#4CAF50", // used for success messages
    red: "#F44336", // used for error messages
  },
  dark: {
    text: "#E6E8EB",
    background: "#0D1117",
    tint: "#5AC8FA", // softer than light tint
    tintLighter: "#1E2A34",
    tintLowOpacity: "rgba(90, 200, 250, 0.2)",
    icon: "#9BA5B1",
    tabIconDefault: "#9BA5B1",
    tabIconSelected: "#5AC8FA",
    proteinBg: "#3BB3AC",
    caloriesBg: "#FF4C4C",
    carbsBg: "#379EB5",
    fatBg: "#FF8C66",
    green: "#4CAF50", // used for success messages
    red: "#F44336", // used for error messages
  },
};

export default Colors;
