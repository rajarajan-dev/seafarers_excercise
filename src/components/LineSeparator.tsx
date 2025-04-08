import { View, Text } from "react-native";
import React from "react";
import { Colors } from "../theme";

const LineSeparator = () => {
  return (
    <View
      style={{
        height: 0.3,
        backgroundColor: Colors.separator,
      }}
    />
  );
};

export default LineSeparator;
