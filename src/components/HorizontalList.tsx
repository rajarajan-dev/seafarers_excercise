import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import IconExclamation from "../assets/icons/iconExclamation.svg";
import { Colors, Typography } from "../theme";

const HorizontalList = () => {
  // Set first item as selected by default
  const [selectedItem, setSelectedItem] = useState(1);

  const items = [
    { id: 1, name: "STCW National", hasAlert: true, selectable: true },
    { id: 2, name: "Flag State", hasAlert: true, selectable: false },
    { id: 3, name: "GDPR Documents", hasAlert: false, selectable: false },
    { id: 4, name: "Training", hasAlert: false, selectable: false },
    { id: 5, name: "Technical", hasAlert: false, selectable: false },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {items.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.itemContainer,
              !item.selectable && styles.disabledItem,
              selectedItem === item.id && styles.selectedItem,
            ]}
            onPress={() => item.selectable && setSelectedItem(item.id)}
            activeOpacity={item.selectable ? 0.7 : 1}
            disabled={!item.selectable}
          >
            <View style={styles.itemContent}>
              {item.hasAlert && (
                <IconExclamation
                  height={12}
                  width={12}
                  color="#FF0000"
                  style={styles.alertIcon}
                />
              )}
              <Text
                style={[
                  styles.itemText,
                  !item.selectable && styles.disabledText,
                  selectedItem === item.id && styles.selectedText,
                ]}
              >
                {item.name}
              </Text>
            </View>

            {/* Selection Indicator (bottom border) */}
            {selectedItem === item.id && (
              <View style={styles.selectionIndicator} />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 25 },
  scrollContainer: {},
  itemContainer: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginRight: 5,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  disabledItem: {
    opacity: 0.5,
  },
  selectedItem: {
    color: Colors.marlowBlue,
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  alertIcon: {
    marginRight: 3,
  },
  itemText: {
    fontSize: 14,
    color: "#333",
    fontFamily: Typography.fontFamily.RobotoBold,
  },
  disabledText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.RobotoMedium,
    color: Colors.nav500,
  },
  selectedText: {
    color: Colors.marlowBlue,
    fontFamily: Typography.fontFamily.RobotoBold,
  },
  selectionIndicator: {
    position: "absolute",
    bottom: -2,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: Colors.marlowBlue,
  },
});

export default HorizontalList;
