import React, { useRef, useState } from "react";
import {
  View,
  Text,
  SectionList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

import {
  useAppDispatch,
  useAppSelector,
} from "../../hooks/stateManagementHooks";
import { ChecklistItem } from "../../types/CheckListTypes";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  removeCheckListItem,
  toggleCheckListItemStatus,
} from "../../store/mychecklistSlice";
import { RootStackParamList } from "../../types/navigation";
import styles from "./ViewlistsScreen.style";
import IconBack from "../../assets/icons/iconBack.svg";
import RoundedButtonOutline from "../../components/RoundedButtonOutline";
import LineSeparator from "../../components/LineSeparator";
import IconDocument from "../../assets/icons/iconDocument.svg";
import SwipeableSectionRow, {
  SwipeableSectionRowRef,
} from "../../components/SwipeableSectionRow";

type ShowCheckListNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Viewlists"
>;

interface Section {
  title: string;
  data: ChecklistItem[];
}

const ViewlistsScreen = () => {
  const [isScrollEnabled, setScrollEnabled] = useState(true);
  const navigation = useNavigation<ShowCheckListNavigationProp>();
  const { data } = useAppSelector((state) => state.mycheckList);
  const route = useRoute();
  const { titleId } = route.params as { titleId: string };

  const dispatch = useAppDispatch();

  const rowRefs = useRef(new Map<string, SwipeableSectionRowRef>());
  const scrollRef = useRef<boolean>(true);

  const currentCategory = data.find((category) => category.titleId === titleId);

  // Filter items by status
  const todoItems =
    currentCategory?.items.filter((item) => item.status === "Todo") || [];
  const doneItems =
    currentCategory?.items.filter((item) => item.status === "Done") || [];

  // Prepare sections conditionally
  const sections: Section[] = [];
  if (todoItems.length > 0) {
    sections.push({
      title: doneItems.length > 0 ? "To-do" : "",
      data: todoItems,
    });
  }
  if (doneItems.length > 0) {
    sections.push({ title: "Completed tasks", data: doneItems });
  }

  const showEmptyState = sections.length === 0;

  const toggleItemStatus = (itemId: string) => {
    dispatch(
      toggleCheckListItemStatus({
        titleId,
        itemId,
      })
    );
  };

  const closeAllRows = () => {
    rowRefs.current.forEach((ref) => ref?.close());
  };

  const navigateToEdit = () => {
    navigation.navigate("Editlists", { titleId });
  };

  const renderItem = ({ item }: { item: ChecklistItem }) => (
    <SwipeableSectionRow
      key={item.itemId + item.status}
      ref={(ref) => {
        if (ref) {
          rowRefs.current.set(item.itemId, ref);
        } else {
          rowRefs.current.delete(item.itemId);
        }
      }}
      onDelete={() => {
        closeAllRows();
        dispatch(
          removeCheckListItem({ titleId: titleId, itemId: item.itemId })
        );
      }}
      onToggle={() => {
        closeAllRows();
        toggleItemStatus(item.itemId);
      }}
      isTodo={item.status === "Todo"}
      setScrolling={(enabled) => {
        scrollRef.current = enabled;
        setScrollEnabled(enabled);
      }}
    >
      <View style={styles.itemContainer}>
        <View style={styles.circle}>
          <IconDocument height={12} width={12} />
        </View>
        <Text style={styles.itemText}>{item.name}</Text>
      </View>
    </SwipeableSectionRow>
  );

  // Custom section header renderer that hides empty titles
  const renderSectionHeader = ({ section }: { section: Section }) => {
    if (!section.title) return null; // Hide header if title is empty

    return (
      <View>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>{section.title}</Text>
        </View>
        <LineSeparator />
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.popToTop();
            }}
          >
            <View style={styles.cancelContainer}>
              <IconBack height={25} width={25} />
              <Text style={styles.cancel}>Lists</Text>
            </View>
          </TouchableOpacity>
          <RoundedButtonOutline
            title="Edit List"
            onButtonClick={navigateToEdit}
          />
        </View>

        <Text style={styles.title}>
          {currentCategory?.titleName || "Checklist"}
        </Text>

        <SectionList
          sections={sections}
          keyExtractor={(item) => item.itemId}
          renderItem={renderItem}
          scrollEnabled={isScrollEnabled}
          renderSectionHeader={renderSectionHeader}
          ListFooterComponent={() => <LineSeparator />}
          ItemSeparatorComponent={() => <LineSeparator />}
          ListEmptyComponent={
            showEmptyState ? (
              <Text style={styles.emptyText}>No items found</Text>
            ) : null
          }
          contentContainerStyle={styles.listContent}
          stickySectionHeadersEnabled={true}
        />
      </View>
    </SafeAreaView>
  );
};

export default ViewlistsScreen;
