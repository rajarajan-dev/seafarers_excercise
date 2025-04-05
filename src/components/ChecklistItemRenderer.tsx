import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors, Typography } from "../theme";
import { ChecklistCategory } from "../types/CheckListTypes";
import IconArrow from "../assets/icons/iconArrow.svg";
import { formatDateToDDMMYY } from "../helper/formatDateToDDMMYY";

const ChecklistItemRenderer = ({ item }: { item: ChecklistCategory }) => {
  return (
    <View style={styles.ListRow}>
      <View style={styles.contentPart}>
        <Text style={styles.heading}>{item.titleName} </Text>
        <Text style={styles.subHeading}>
          {`Date created:  ${formatDateToDDMMYY(item.createdAt)}`}{" "}
        </Text>
        <Text style={styles.subHeading}>
          {`Last item added:  ${item.lastItemAdded}`}{" "}
        </Text>
      </View>
      <View style={styles.arrowPart}>
        <IconArrow
          width={15}
          height={15}
          style={styles.arrow}
          fill={Colors.grey600}
        />
      </View>
    </View>
  );
};

export default ChecklistItemRenderer;

const styles = StyleSheet.create({
  ListRow: {
    backgroundColor: Colors.white,
    padding: 16,
    marginTop: 10,
    flex: 1,
    flexDirection: "row",
  },
  contentPart: {
    flex: 1,
    flexGrow: 1,
  },
  arrowPart: {
    alignItems: "stretch",
    justifyContent: "center",
  },
  heading: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.RobotoRegular,
    marginBottom: 4,
  },
  subHeading: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.RobotoRegular,
    color: Colors.grey600,
  },
  arrow: {},
});
