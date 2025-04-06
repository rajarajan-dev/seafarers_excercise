import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Colors, Typography } from "../theme";
interface Props {
  title: string;
  onButtonClick: () => void;
}

const RoundedButtonOutline: React.FC<Props> = ({ title, onButtonClick }) => {
  return (
    <View style={styles.saveEditContainer}>
      <TouchableOpacity onPress={onButtonClick}>
        <View style={styles.saveButton}>
          <Text style={styles.saveText}>{title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default RoundedButtonOutline;

const styles = StyleSheet.create({
  saveEditContainer: {
    marginRight: 12,
    justifyContent: "center",
  },
  saveButton: {
    backgroundColor: "transparent", // No fill
    borderColor: Colors.blue,
    borderWidth: 2,
    paddingVertical: 8,
    paddingHorizontal: 16,
    minHeight: 35,
    minWidth: 100,
    borderRadius: 35,
  },
  saveText: {
    color: Colors.blue,
    textAlign: "center",
    fontFamily: Typography.fontFamily.RobotoBold,
    fontSize: 14,
  },
});
