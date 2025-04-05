import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Colors, Typography } from "../theme";
interface Props {
  title: string;
  onButtonClick: () => void;
}

const RoundedButton: React.FC<Props> = ({ title, onButtonClick }) => {
  return (
    <View style={styles.saveEditContainer}>
      <TouchableOpacity
        onPress={() => {
          onButtonClick;
        }}
      >
        <View style={styles.saveButton}>
          <Text style={styles.saveText}>{title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default RoundedButton;

const styles = StyleSheet.create({
  saveEditContainer: {
    marginRight: 12,
    justifyContent: "center",
  },
  saveButton: {
    backgroundColor: Colors.blue,
    padding: 16,
    minWidth: 100,
    minHeight: 35,
    borderRadius: 35,
  },
  saveText: {
    color: "white",
    textAlign: "center",
    fontFamily: Typography.fontFamily.RobotoBold,
    fontSize: 14,
  },
});
