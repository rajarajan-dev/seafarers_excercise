import React, { useRef, useState } from "react";
import { TouchableOpacity, FlatList, View, Alert } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/navigation";
import CustomHeader from "../../components/CustomHeader";
import styles from "./ChecklistScreen.style";
import { SafeAreaView } from "react-native-safe-area-context";
import TitleAndSubtitleSection from "../../components/TitleAndSubtitleSection";
import { useAppDispatch } from "../../hooks/stateManagementHooks";
import IconAdd from "../../assets/icons/iconAdd.svg";
import checklistData from "../../mocks/ChecklistCategory";
import ChecklistItemRenderer from "../../components/ChecklistItemRenderer";

type Props = StackScreenProps<RootStackParamList, "Checklists">;

const ChecklistsScreen: React.FC<Props> = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const listRef = useRef<FlatList>(null);
  const scrollRef = useRef<boolean>(true);

  const dispatch = useAppDispatch();
  // const data = useAppSelector(selectMyCheckList);

  const data = checklistData;

  const handleDelete = (id: string) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this item?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            //setData((prev) => prev.filter((item) => item.id !== id));
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title={"Checklists"} showBackButton />
      <TitleAndSubtitleSection
        title="Pre-Departure Documents List"
        subTitle="List of all required documents for your upcoming assignment"
        style={{ marginTop: 38 }}
      />
      <TitleAndSubtitleSection
        title="My Checklists"
        subTitle="Create your own personal checklist"
        style={{ marginTop: 24 }}
      />
      <FlatList
        data={data}
        keyExtractor={(title) => title.titleId}
        style={{ marginTop: 10 }}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 12,
              backgroundColor: "transparent",
            }}
          />
        )}
        renderItem={({ item }) => (
          <ChecklistItemRenderer
            checkListCategory={item}
            onDelete={handleDelete}
            setScrolling={(enabled) => {
              scrollRef.current = enabled;
              listRef.current?.setNativeProps({ scrollEnabled: enabled });
            }}
          />
        )}
        ref={listRef}
      />

      {/* Floating Button to Open Modal */}
      <TouchableOpacity
        style={styles.floatingAddIcon}
        onPress={() => setModalVisible(true)}
      >
        <IconAdd width={70} height={70} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ChecklistsScreen;
