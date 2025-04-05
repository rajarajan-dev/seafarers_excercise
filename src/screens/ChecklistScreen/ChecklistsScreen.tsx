import React, { useState } from "react";
import { View, Text, Button, TouchableOpacity, FlatList } from "react-native";
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
import { selectMyCheckList } from "../../store/mychecklistSlice";
import IconAdd from "../../assets/icons/iconAdd.svg";
import { ChecklistCategory } from "../../types/CheckListTypes";
import checklistData from "../../mocks/ChecklistCategory";
import ChecklistItemRenderer from "../../components/ChecklistItemRenderer";

type Props = StackScreenProps<RootStackParamList, "Checklists">;

const ChecklistsScreen: React.FC<Props> = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useAppDispatch();
  // const data = useAppSelector(selectMyCheckList);

  const data = checklistData;

  

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
        renderItem={ChecklistItemRenderer}
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
