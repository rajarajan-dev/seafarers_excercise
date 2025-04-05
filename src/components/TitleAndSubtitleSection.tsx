import { View, Text, StyleSheet, StyleProp, ViewStyle } from "react-native";
import React from "react";
import { Typography } from "../theme";

interface Props {
  title: string;
  subTitle: string;
  style?: StyleProp<ViewStyle> | undefined;
}
const TitleAndSubtitleSection: React.FC<Props> = ({
  title,
  subTitle,
  style,
}) => {
  return (
    <View style={style}>
      <Text style={styles.heading}>{title}</Text>
      <Text style={styles.subHeading}>{subTitle}</Text>
    </View>
  );
};

export default TitleAndSubtitleSection;

const styles = StyleSheet.create({
  heading: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.RobotoMedium,
    textTransform: "capitalize",
  },
  subHeading: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.RobotoItalic,
    textTransform: "capitalize",
    fontStyle: "italic",
    marginTop: 4,
  },
});
