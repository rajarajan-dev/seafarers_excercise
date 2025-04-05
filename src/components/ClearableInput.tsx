import React, { useRef, forwardRef, useImperativeHandle } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TextInput as RNTextInput,
} from "react-native";
import IconClear from "../assets/icons/iconClose.svg";
import { Colors, Typography } from "../theme";

export interface ClearableInputRef {
  focus: () => void;
}

interface ClearableInputProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
}

const ClearableInput = forwardRef<ClearableInputRef, ClearableInputProps>(
  ({ placeholder, value, onChangeText }, ref) => {
    const inputRef = useRef<RNTextInput>(null);

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus();
      },
    }));

    return (
      <View style={styles.inputRow}>
        <TextInput
          ref={inputRef}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder || "Insert list's title"}
          placeholderTextColor="#888"
          style={styles.textInput}
        />
        {value.length > 0 && (
          <TouchableOpacity
            onPress={() => onChangeText("")}
            style={styles.clearButton}
          >
            <IconClear width={30} height={30} fill={Colors.black} />
          </TouchableOpacity>
        )}
      </View>
    );
  }
);

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
