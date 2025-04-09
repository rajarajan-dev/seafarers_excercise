import React, { RefObject } from "react";
import { FlatList, TextInput, View, Text, StyleSheet } from "react-native";
import { ChecklistItem } from "../../types/CheckListTypes";
import { Colors, Typography } from "../../theme";
import IconDocument from "../../assets/icons/iconDocument.svg";
import LineSeparator from ".././atoms/LineSeparator";

type Props = {
  items: ChecklistItem[];
  onTextChange: (itemId: string, text: string) => void;
  onSubmitNewItem: () => void;
  flatListRef: RefObject<FlatList | null>;
  lastInputRef: RefObject<TextInput | null>;
};

const ChecklistItemsList = ({
  items,
  onTextChange,
  onSubmitNewItem,
  flatListRef,
  lastInputRef,
}: Props) => {
  return (
    <FlatList
      data={items}
      style={styles.list}
      keyExtractor={(item) => item.itemId}
      ref={flatListRef}
      ListFooterComponent={() => <LineSeparator />}
      ListHeaderComponent={() => <LineSeparator />}
      ItemSeparatorComponent={() => <LineSeparator />}
      renderItem={({ item, index }) => {
        const isLastItem = index === items.length - 1;

        return (
          <View style={styles.itemContainer}>
            <IconDocument height={25} width={25} />

            <TextInput
              ref={isLastItem ? lastInputRef : null}
              style={styles.itemInput}
              value={item.name}
              onChangeText={(text) => onTextChange(item.itemId, text)}
              onSubmitEditing={onSubmitNewItem}
              returnKeyType="done"
              autoCorrect={false}
              autoCapitalize="none"
              autoComplete="off"
              spellCheck={false}
              multiline={false}
            />
          </View>
        );
      }}
    />
  );
};

export default ChecklistItemsList;

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  itemContainer: {
    padding: 16,
    height: 64,
    backgroundColor: "transparent",
    borderRadius: 0,
    borderWidth: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  itemInput: {
    fontSize: 16,
    color: Colors.text,
    paddingVertical: 8,
    borderBottomWidth: 0,
    marginLeft: 18,
    fontFamily: Typography.fontFamily.RobotoRegular,
  },
  circle: {
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: Colors.marlowBlue,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
});
