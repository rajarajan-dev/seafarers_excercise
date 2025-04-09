import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { Colors, Typography } from "../../theme";

const GradientProgressBar = ({
  progress = 50,
  height = 20,
  borderRadius = 10,
  showLabel = true,
  labelStyle = {},
}: {
  progress?: number;
  height?: number;
  borderRadius?: number;
  showLabel?: boolean;
  labelStyle?: any;
}) => {
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: progress,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const getDynamicLocations = () => {
    const progressRatio = progress / 100;
    return [0, progressRatio * 0.5, progressRatio];
  };

  return (
    <View>
      {/* Label */}
      {showLabel && (
        <View style={styles.labelContainer}>
          <Text style={[styles.labelText, labelStyle]}>
            {progress}% completed
          </Text>
        </View>
      )}

      {/* Bar */}
      <View style={[styles.container, { height, borderRadius }]}>
        <View style={[styles.background, { borderRadius }]} />
        <MaskedView
          style={{ flex: 1 }}
          maskElement={
            <Animated.View
              style={{
                width: animatedWidth.interpolate({
                  inputRange: [0, 100],
                  outputRange: ["0%", "100%"],
                }),
                height: "100%",
                backgroundColor: "black",
                borderTopLeftRadius: borderRadius,
                borderBottomLeftRadius: borderRadius,
                borderTopRightRadius: progress === 100 ? borderRadius : 0,
                borderBottomRightRadius: progress === 100 ? borderRadius : 0,
              }}
            />
          }
        >
          <LinearGradient
            colors={["#005AA5", "#0091BA", "#85C9BF"]}
            locations={getDynamicLocations()}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ flex: 1 }}
          />
        </MaskedView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    overflow: "hidden",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
    borderWidth: 0.8,
    borderColor: Colors.marlowBlue,
    borderStyle: "dashed",
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 4,
  },
  labelText: {
    fontSize: 12,
    fontWeight: "500",
    fontFamily: Typography.fontFamily.RobotoRegular,
    color: "#333",
  },
});

export default GradientProgressBar;
