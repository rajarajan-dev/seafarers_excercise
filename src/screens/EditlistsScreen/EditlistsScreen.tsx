import {
  View,
  Text,
  Button,
  TextInput,
  FlatList,
  Alert,
  SafeAreaView,
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
import CustomHeader from "../../components/CustomHeader";

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

  const [newItemText, setNewItemText] = useState("");
  const [temporaryItems, setTemporaryItems] = useState<ChecklistItem[]>([]);
  const [hasChanges, setHasChanges] = useState(false);

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
      setNewItemText("");
      setHasChanges(true);
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
    setHasChanges(true);
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

    setHasChanges(false);
    //navigation.push("ShowCheckList", { titleId: titleId });
  };

  const handleCancelChanges = () => {
    if (checklist) {
      setTemporaryItems([...checklist.items]);
    }
    setHasChanges(false);
    Alert.alert("Changes reverted", "All edits have been cancelled");
  };

  if (!checklist) return <Text>List not found</Text>;

  const renderItem = ({
    item,
    index,
  }: {
    item: ChecklistItem;
    index: number;
  }) => {
    const isLastItem = index === temporaryItems.length - 1;

    return (
      <View style={styles.itemContainer}>
        <TextInput
          ref={isLastItem ? lastInputRef : null}
          style={styles.itemInput}
          value={item.name}
          onChangeText={(text) => handleTextChange(item.itemId, text)}
          placeholder="Edit item"
          onSubmitEditing={handleAddCheckListItem}
          returnKeyType="done"
          multiline={false}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} // Adjust as needed
      >
        <View>
          <CustomHeader title={"Checklists"} showBackButton />
          <Text style={styles.title}>{checklist.titleName}</Text>

          <View style={styles.addItemContainer}>
            <TextInput
              value={newItemText}
              onChangeText={setNewItemText}
              placeholder="Enter new item"
              style={styles.addItemInput}
            />
            <Button
              title="Add"
              onPress={handleAddCheckListItem}
              disabled={!newItemText.trim()}
            />
            <Button title="DeleteAll" onPress={handleDeleteAllCheckListItem} />
          </View>

          <View style={styles.actionButtons}>
            <Button
              title="Cancel"
              onPress={handleCancelChanges}
              disabled={!hasChanges}
              color="#ff4444"
            />
            <Button
              title="Save All"
              onPress={handleSaveChanges}
              disabled={!hasChanges}
            />
          </View>

          <FlatList
            data={temporaryItems}
            style={styles.list}
            keyExtractor={(item) => item.itemId}
            ref={flatListRef}
            renderItem={renderItem}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EditlistsScreen;
