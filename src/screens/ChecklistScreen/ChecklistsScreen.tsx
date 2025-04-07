import React, { useRef, useState } from "react";
import {
  TouchableOpacity,
  FlatList,
  View,
  Alert,
  Modal,
  StyleSheet,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/navigation";
import CustomHeader from "../../components/CustomHeader";
import styles from "./ChecklistScreen.style";
import { SafeAreaView } from "react-native-safe-area-context";
import TitleAndSubtitleSection from "../../components/TitleAndSubtitleSection";
import {
  useAppDispatch,
  useAppSelector,
} from "../../hooks/stateManagementHooks";
import IconAdd from "../../assets/icons/iconAdd.svg";
import checklistData from "../../mocks/ChecklistCategory";
import ChecklistItemRenderer from "../../components/ChecklistItemRenderer";
import AddNewChecklistScreen from "../MyChecklists/AddNewChecklistScreen/AddNewChecklistScreen";
import { BlurView } from "@react-native-community/blur";
import {
  removeCheckListCategory,
  selectMyCheckList,
} from "../../store/mychecklistSlice";

type Props = StackScreenProps<RootStackParamList, "Checklists">;

const ChecklistsScreen: React.FC<Props> = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const listRef = useRef<FlatList>(null);
  const scrollRef = useRef<boolean>(true);

  const dispatch = useAppDispatch();
  const data = useAppSelector(selectMyCheckList);

  const handleDelete = (id: string) => {
    dispatch(removeCheckListCategory({ titleId: id }));
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
      {data && (
        <FlatList
          data={data.data}
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
      )}

      {/* Floating Button to Open Modal */}
      <TouchableOpacity
        style={styles.floatingAddIcon}
        onPress={() => setModalVisible(true)}
      >
        <IconAdd width={70} height={70} />
      </TouchableOpacity>

      {/* MODAL */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.absolute}>
          <BlurView
            style={StyleSheet.absoluteFill}
            blurType="light"
            blurAmount={1}
            reducedTransparencyFallbackColor="white"
          />
          <AddNewChecklistScreen setModalVisible={setModalVisible} />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ChecklistsScreen;
