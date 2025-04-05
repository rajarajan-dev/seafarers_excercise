import { View, TextInput, Button, TouchableOpacity, Text } from "react-native";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

import CircularIcon from "../../components/CircularIcon";
import useStatusBarHeight from "../../hooks/useStatusBarHeight";
import { styles } from "./AddNewChecklistScreen.style";
import ClearableInput, {
  ClearableInputRef,
} from "../../components/ClearableInput";
import RoundedButton from "../../components/RoundedButton";

interface Props {
  setModalVisible: (visible: boolean) => void;
}

const AddNewChecklistScreen: React.FC<Props> = ({ setModalVisible }) => {
  const statusBarHeight = useStatusBarHeight(); // Get the status bar height
  const [insertItem, setInsertItem] = useState("");
  const inputRef = useRef<ClearableInputRef>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.modalContainer}>
      <View
        style={[styles.insideContainer, { marginTop: statusBarHeight + 15 }]}
      >
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
            }}
          >
            <CircularIcon props={styles.circleContainer} />
          </TouchableOpacity>
          <RoundedButton title="Done" onButtonClick={() => {}} />
        </View>
        {/* Title input box */}
        <View style={styles.titleInputBox}>
          <ClearableInput
            ref={inputRef}
            value={insertItem}
            onChangeText={setInsertItem}
            placeholder="Insert list's title"
          />
        </View>
      </View>
    </View>
  );
};

export default AddNewChecklistScreen;
