import React from "react";
import { View, Text, Button } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/navigation";
import CustomHeader from "../../components/CustomHeader";
import styles from "./ChecklistScreen.style";
import { SafeAreaView } from "react-native-safe-area-context";
import TitleAndSubtitleSection from "../../components/TitleAndSubtitleSection";

type Props = StackScreenProps<RootStackParamList, "Checklists">;

const ChecklistsScreen: React.FC<Props> = ({ navigation }) => {
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
    </SafeAreaView>
  );
};

export default ChecklistsScreen;
