import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import CustomHeader from "../components/CustomHeader";

type Props = StackScreenProps<RootStackParamList, "Checklists">;

const ChecklistsScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <CustomHeader title="Checklists" showBackButton />
      <Text style={styles.title}>Checklists Screen</Text>
      <Button
        title="Go to Viewlists"
        onPress={() => navigation.navigate("Viewlists")}
      />
      <Button
        title="Go to Editlists"
        onPress={() => navigation.navigate("Editlists")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold" },
});

export default ChecklistsScreen;
