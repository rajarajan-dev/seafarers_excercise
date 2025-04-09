import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Typography } from "../../theme";

interface Props {
  handleConfirmation: (confirm: boolean) => void;
}

const ConfirmationDialog: React.FC<Props> = ({ handleConfirmation }) => {
  return (
    <View style={styles.overlay}>
      <View style={styles.dialogContainer}>
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>
            Have you informed your{"\n"}
            Manning Agency that this{"\n"}
            document is ready?
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.noButton]}
            onPress={() => handleConfirmation(false)}
          >
            <Text style={styles.buttonText}>No</Text>
          </TouchableOpacity>
          {/* Vertical separator between buttons */}
          <View style={styles.buttonSeparator} />
          <TouchableOpacity
            style={[styles.button, styles.yesButton]}
            onPress={() => handleConfirmation(true)}
          >
            <Text style={styles.buttonText}>Yes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  dialogContainer: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden", // Ensures the borderRadius is respected for children
    minHeight: 180,
  },
  messageContainer: {
    flex: 1, // Takes up all available space
    justifyContent: "center",
    padding: 20,
  },
  messageText: {
    fontSize: 13,
    textAlign: "center",
    lineHeight: 24,
    fontFamily: Typography.fontFamily.RobotoBold,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 40,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  buttonSeparator: {
    width: 1,
    height: "100%",
    backgroundColor: "#e0e0e0",
  },
  button: {
    flex: 1,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 5,
    justifyContent: "center",
  },
  noButton: {
    backgroundColor: "transparent",
  },
  yesButton: {
    backgroundColor: "transparent",
  },
  buttonText: {
    fontSize: 14,
    color: "black",
    fontFamily: Typography.fontFamily.RobotoRegular,
  },
});

export default ConfirmationDialog;
