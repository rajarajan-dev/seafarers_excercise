import {
  View,
  Text,
  TextInput,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, useRoute } from "@react-navigation/core";
import {
  useAppDispatch,
  useAppSelector,
} from "../../hooks/stateManagementHooks";
import {
  removeAllCheckListItems,
  selectMyCheckList,
  updateMultipleCheckListItems,
} from "../../store/mychecklistSlice";
import { ChecklistItem } from "../../types/CheckListTypes";
import styles from "./EditlistsScreen.style";
import { KeyboardAvoidingView, Platform } from "react-native";
import { RootStackParamList } from "../../types/navigation";
import { generateUniqueId } from "../../helper/generateUniqueId";
import RoundedButton from "../../components/RoundedButton";
import IconBack from "../../assets/icons/iconBack.svg";
import ChecklistItemsList from "../../components/ChecklistItemsList";

type ShowCheckListNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Editlists"
>;

export interface EditCheckListProps {
  titleId: string;
}

const EditlistsScreen = () => {
  const navigation = useNavigation<ShowCheckListNavigationProp>();
  const route = useRoute();
  const { titleId } = route.params as EditCheckListProps;
  const { data } = useAppSelector(selectMyCheckList);
  const dispatch = useAppDispatch();

  const [temporaryItems, setTemporaryItems] = useState<ChecklistItem[]>([]);

  const flatListRef = useRef<FlatList>(null);
  const lastInputRef = useRef<TextInput>(null);

  const checklist = data.find((d) => d.titleId == titleId);

  // Initialize temporary items when checklist is available
  useEffect(() => {
    if (checklist) {
      const newItem: ChecklistItem = {
        itemId: generateUniqueId(),
        name: "",
        status: "Todo",
      };
      setTemporaryItems([...checklist.items, newItem]);

      // Focus the new input after it's rendered
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
        lastInputRef.current?.focus();
      }, 100);
    }
  }, [checklist]);

  const handleDeleteAllCheckListItem = () => {
    dispatch(removeAllCheckListItems({ titleId }));
  };

  const handleAddCheckListItem = () => {
    // Check if the last item is empty
    const lastItem = temporaryItems[temporaryItems.length - 1];
    const shouldAddNewItem = lastItem.name.trim() !== "";

    const newItem: ChecklistItem = {
      itemId: generateUniqueId(),
      name: "",
      status: "Todo",
    };

    if (shouldAddNewItem) {
      setTemporaryItems((prev) => [...prev, newItem]);
    }

    // Focus the new input after it's rendered
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
      lastInputRef.current?.focus();
    }, 100);
  };

  const handleTextChange = (itemId: string, newText: string) => {
    setTemporaryItems((prevItems) =>
      prevItems.map((item) =>
        item.itemId === itemId ? { ...item, name: newText } : item
      )
    );
  };

  const handleSaveChanges = () => {
    if (!checklist) return;

    // Filter out items with empty names
    const nonEmptyItems = temporaryItems.filter(
      (item) => item.name.trim() !== ""
    );

    // Create an action to update all items at once
    dispatch(
      updateMultipleCheckListItems({
        titleId,
        items: nonEmptyItems,
      })
    );

    navigation.push("Viewlists", { titleId: titleId });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} // Adjust as needed
      >
        <View style={{ flex: 1 }}>
          {/* Header */}
          <View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <View style={styles.cancelContainer}>
                <IconBack height={25} width={25} />
                <Text style={styles.cancel}>Cancel</Text>
              </View>
            </TouchableOpacity>
            <RoundedButton title="Save" onButtonClick={handleSaveChanges} />
          </View>
          {checklist && <Text style={styles.title}>{checklist.titleName}</Text>}
          <View style={{ flex: 1, flexGrow: 1 }}>
            <ChecklistItemsList
              items={temporaryItems}
              onTextChange={handleTextChange}
              onSubmitNewItem={handleAddCheckListItem}
              flatListRef={flatListRef}
              lastInputRef={lastInputRef}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EditlistsScreen;
