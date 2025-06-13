const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');
// reanimated
const {
    wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');


const config = getDefaultConfig(__dirname)

module.exports = wrapWithReanimatedMetroConfig(
    withNativeWind(config, { input: './styles/globals.css' })
);