import React from "react";
import { View, Text, Button } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/navigation";
import CustomHeader from "../../components/CustomHeader";
import styles from "./ChecklistScreen.style";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = StackScreenProps<RootStackParamList, "Checklists">;

const ChecklistsScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checklists Screen</Text>
      <Button
        title="Go to Viewlists"
        onPress={() => navigation.navigate("Viewlists")}
      />
      <Button
        title="Go to Editlists"
        onPress={() => navigation.navigate("Editlists")}
      />
      <Text style={styles.normalregular}>This is Roboto Regular</Text>
      <Text style={{ fontSize: 18 }}>This is Roboto Regular</Text>
      <Text style={styles.regular}>This is Roboto Regular</Text>
      <Text style={styles.bold}>This is Roboto Bold</Text>
    </View>
  );
};

export default ChecklistsScreen;
