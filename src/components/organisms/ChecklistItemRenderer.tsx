import {
  StyleSheet,
  View,
  Text,
  Animated,
  Easing,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { Colors, Typography } from "../../theme";
import { ChecklistCategory } from "../../types/CheckListTypes";
import IconArrow from "../../assets/icons/iconArrow.svg";
import { formatDateToDDMMYY } from "../../helper/formatDateToDDMMYY";
import SwipeableRow, { SwipeableRowRef } from "./SwipeableRow";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/navigation";

type Props = {
  checkListCategory: ChecklistCategory;
  setScrolling: (enabled: boolean) => void;
  onDelete: (id: string) => void;
};

const ChecklistItemRenderer = ({
  checkListCategory,
  setScrolling,
  onDelete,
}: Props) => {
  const rowRef = useRef<SwipeableRowRef>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(20)).current;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleDelete = () => {
    // Optional: animate out before calling delete
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      onDelete(checkListCategory.titleId);
      rowRef.current?.close();
    });
  };

  // Animate in on mount
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <SwipeableRow setScrolling={setScrolling} onDelete={() => handleDelete()}>
      <Animated.View
        style={[
          styles.container,
          {
            opacity: fadeAnim,
            transform: [{ translateY: translateYAnim }],
          },
        ]}
      >
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => {
              if (
                checkListCategory.items &&
                checkListCategory.items.length > 0
              ) {
                navigation.push("Viewlists", {
                  titleId: checkListCategory.titleId,
                });
              } else {
                navigation.push("Editlists", {
                  titleId: checkListCategory.titleId,
                });
              }
            }}
          >
            <View style={styles.ListRow}>
              <View style={styles.contentPart}>
                <Text style={styles.heading}>
                  {checkListCategory.titleName}{" "}
                </Text>
                <Text style={styles.subHeading}>
                  {`Date created:  ${formatDateToDDMMYY(
                    checkListCategory.createdAt
                  )}`}{" "}
                </Text>
                <Text style={styles.subHeading}>
                  {`Last item added:  ${checkListCategory.lastItemAdded}`}{" "}
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
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SwipeableRow>
  );
};

export default ChecklistItemRenderer;

const styles = StyleSheet.create({
  ListRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    paddingLeft: 20,
    backgroundColor: "white",
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

  container: {
    position: "relative",
    justifyContent: "center",
    width: "100%",
  },
  item: {
    justifyContent: "center",
    width: "100%",
  },

  actionsContainer: {
    position: "absolute",
    right: 0,
    height: "100%",
    flexDirection: "row",
  },
  action: {
    width: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  archive: {
    backgroundColor: "#4CAF50",
  },
  delete: {
    backgroundColor: "#F44336",
  },
  actionText: {
    color: "white",
    fontSize: 16,
  },
});
