import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  ViewStyle,
  TextStyle,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withSequence,
  withTiming,
  interpolate,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

interface AnimatedCardProps {
  title: string;
  subtitle?: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
  width?: number;
  height?: number;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
  enableFloating?: boolean;
  floatingDuration?: number;
  children?: React.ReactNode;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  title,
  subtitle,
  onPress,
  backgroundColor = "#4C63D2",
  textColor = "#FFFFFF",
  width: cardWidth = width * 0.9,
  height: cardHeight = 120,
  style,
  titleStyle,
  subtitleStyle,
  enableFloating = true,
  floatingDuration = 3000,
  children,
}) => {
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);
  const rotateZ = useSharedValue(0);
  const shadowOpacity = useSharedValue(0.3);
  const shadowRadius = useSharedValue(5);

  // Floating animation
  useEffect(() => {
    if (enableFloating) {
      translateY.value = withRepeat(
        withSequence(
          withTiming(-3, { duration: floatingDuration / 2 }),
          withTiming(3, { duration: floatingDuration / 2 })
        ),
        -1,
        true
      );

      rotateZ.value = withRepeat(
        withSequence(
          withTiming(-1, { duration: floatingDuration }),
          withTiming(1, { duration: floatingDuration })
        ),
        -1,
        true
      );
    }
  }, [enableFloating, floatingDuration]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { translateY: translateY.value },
        { rotateZ: `${rotateZ.value}deg` },
      ],
      shadowOpacity: shadowOpacity.value,
      shadowRadius: shadowRadius.value,
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 15 });
    shadowOpacity.value = withSpring(0.6);
    shadowRadius.value = withSpring(10);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15 });
    shadowOpacity.value = withSpring(0.3);
    shadowRadius.value = withSpring(5);
  };

  const handleHoverIn = () => {
    scale.value = withSpring(1.05, { damping: 15 });
    shadowOpacity.value = withSpring(0.5);
    shadowRadius.value = withSpring(15);
  };

  const handleHoverOut = () => {
    scale.value = withSpring(1, { damping: 15 });
    shadowOpacity.value = withSpring(0.3);
    shadowRadius.value = withSpring(5);
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          width: cardWidth,
          height: cardHeight,
          backgroundColor,
          shadowColor: backgroundColor,
        },
        animatedStyle,
        style,
      ]}
    >
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        onHoverIn={handleHoverIn}
        onHoverOut={handleHoverOut}
        style={styles.pressable}
      >
        <View style={styles.content}>
          {children || (
            <>
              <Text style={[styles.title, { color: textColor }, titleStyle]}>
                {title}
              </Text>
              {subtitle && (
                <Text
                  style={[styles.subtitle, { color: textColor }, subtitleStyle]}
                >
                  {subtitle}
                </Text>
              )}
            </>
          )}
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  pressable: {
    flex: 1,
    borderRadius: 16,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 4,
    opacity: 0.9,
  },
});

export default AnimatedCard;
