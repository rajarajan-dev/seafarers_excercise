import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BackArrow from "../../assets/icons/backarrow.svg";
import { Typography } from "../../theme";

interface Props {
  title: string;
  showBackButton?: boolean;
}

const CustomHeader: React.FC<Props> = ({ title, showBackButton = false }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {showBackButton ? (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <BackArrow fill="black" style={styles.backIcon} />
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}
      <Text style={styles.title}>{title}</Text>
      <View style={styles.placeholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 35,
  },
  backButton: {
    padding: 5,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: "white",
  },
  title: {
    fontSize: 16,
    color: "black",
    flex: 1,
    fontFamily: Typography.fontFamily.RobotoBold,
    textTransform: "capitalize",
    textAlign: "center",
  },
  placeholder: {
    width: 24, // Matches the back icon size to maintain symmetry
  },
});

export default CustomHeader;
