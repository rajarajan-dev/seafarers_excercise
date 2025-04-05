import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import IconBack from "../assets/icons/iconBack.svg";
import { Colors } from "../theme";

interface CircleIconProps {
  props: StyleProp<ViewStyle>;
}
const CircularIcon: React.FC<CircleIconProps> = ({ props }) => {
  return (
    <View style={[styles.circle, props]}>
      <IconBack width={25} color={Colors.white} />
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 40, // Circle width
    height: 40, // Circle height (same as width for perfect circle)
    borderRadius: 20, // Half of width/height to make it a circle
    backgroundColor: "white", // Change color as needed
    justifyContent: "center", // Center icon vertically
    alignItems: "center", // Center icon horizontally
  },
});

export default CircularIcon;
