import { View, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useRef, useState } from "react";

import CircularIcon from "../../components/CircularIcon";
import useStatusBarHeight from "../../hooks/useStatusBarHeight";
import { styles } from "./AddNewChecklistScreen.style";
import ClearableInput, {
  ClearableInputRef,
} from "../../components/ClearableInput";
import RoundedButton from "../../components/RoundedButton";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/navigation";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "../../hooks/stateManagementHooks";
import { ChecklistCategory } from "../../types/CheckListTypes";
import { generateUniqueId } from "../../helper/generateUniqueId";
import { addCheckListCategory } from "../../store/mychecklistSlice";

interface Props {
  setModalVisible: (visible: boolean) => void;
}

type AddCategoryNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Checklists"
>;

const AddNewChecklistScreen: React.FC<Props> = ({ setModalVisible }) => {
  const statusBarHeight = useStatusBarHeight(); // Get the status bar height

  const inputRef = useRef<ClearableInputRef>(null);

  const navigation = useNavigation<AddCategoryNavigationProp>();
  const [insertItem, setInsertItem] = useState("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  const handleAddCheckListCategory = () => {
    if (!insertItem) {
      Alert.alert("Please enter category");
      return;
    }
    const payload: ChecklistCategory = {
      titleId: generateUniqueId(),
      titleName: insertItem,
      createdAt: new Date().toISOString(),
      lastItemAdded: "Not yet",
      items: [],
    };
    dispatch(addCheckListCategory(payload));
    setModalVisible(false);
    //navigation.push("EditCheckList", { titleId: payload.titleId });
  };

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
          <RoundedButton
            title="Done"
            onButtonClick={handleAddCheckListCategory}
          />
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
