import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import IconClear from "../assets/icons/iconClose.svg"; // SVG icon path
import { Colors, Typography } from "../theme";

interface ClearableInputProps {
  placeholder?: string;
}

const ClearableInput: React.FC<ClearableInputProps> = ({ placeholder }) => {
  const [value, setValue] = useState("");

  const clearInput = () => {
    setValue("");
  };

  return (
    <View style={styles.inputRow}>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder || "Insert list's title"}
        placeholderTextColor="#888"
        style={styles.textInput}
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={clearInput} style={styles.clearButton}>
          <IconClear width={30} height={30} fill={Colors.black} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    textAlign: "left",
    fontFamily: Typography.fontFamily.RobotoRegular,
  },
  clearButton: {
    marginLeft: 8,
  },
});

export default ClearableInput;
