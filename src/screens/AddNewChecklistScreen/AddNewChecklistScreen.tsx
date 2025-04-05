import { View, TextInput, Button, TouchableOpacity, Text } from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";

import CircularIcon from "../../components/CircularIcon";
import useStatusBarHeight from "../../hooks/useStatusBarHeight";
import { styles } from "./AddNewChecklistScreen.style";
import ClearableInput from "../../components/ClearableInput";

interface Props {
  setModalVisible: (visible: boolean) => void;
}

const AddNewChecklistScreen: React.FC<Props> = ({ setModalVisible }) => {
  const statusBarHeight = useStatusBarHeight(); // Get the status bar height
  const [insertItem, setInsertItem] = useState("");
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
          <View style={styles.saveEditContainer}>
            <TouchableOpacity onPress={() => {}}>
              <View style={styles.saveButton}>
                <Text style={styles.saveText}>Save</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* Title input box */}
        <View style={styles.titleInputBox}>
          <ClearableInput placeholder="Insert list's title" />
        </View>
      </View>
    </View>
  );
};

export default AddNewChecklistScreen;
