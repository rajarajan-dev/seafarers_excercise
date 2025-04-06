import { View, Text } from "react-native";
import React from "react";
import { Colors } from "../theme";

const LineSeparator = () => {
  return (
    <View
      style={{
        height: 2,
        backgroundColor: Colors.nav30,
      }}
    />
  );
};

export default LineSeparator;
