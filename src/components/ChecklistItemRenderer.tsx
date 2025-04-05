import {
  PanResponder,
  Animated,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useRef } from "react";
import { Colors, Typography } from "../theme";
import { ChecklistCategory } from "../types/CheckListTypes";
import IconArrow from "../assets/icons/iconArrow.svg";
import { formatDateToDDMMYY } from "../helper/formatDateToDDMMYY";

type Props = {
  listRef: React.RefObject<FlatList<any> | null>;
  checkListCategory: ChecklistCategory;
  setScrolling: (enabled: boolean) => void; // Add this line
};

const ChecklistItemRenderer = ({ listRef, checkListCategory }: Props) => {
  const THRESHOLD = 80;
  const pan = useRef(new Animated.ValueXY()).current;

  const release = (distance: number) => {
    /*Animated.spring(pan, {
      toValue: { x: distance, y: 0 },
      useNativeDriver: false,
    }).start(() => {
      listRef.current?.setNativeProps({ scrollEnabled: true });
    });
    */
    Animated.timing(pan, {
      toValue: { x: distance, y: 0 },
      duration: 200,
      useNativeDriver: false,
    }).start(() => {
      listRef.current?.setNativeProps({ scrollEnabled: true });
    });
  };
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_event, gestureState) => {
        // Only trigger swipe if horizontal movement is dominant
        return Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
      },
      onPanResponderMove: (_event, gestureState) => {
        if (Math.abs(gestureState.dx) > Math.abs(gestureState.dy)) {
          // Only lock scrolling if swiping left
          if (gestureState.dx < 0) {
            listRef.current?.setNativeProps({ scrollEnabled: false });
            pan.setValue({ x: Math.max(gestureState.dx, -THRESHOLD), y: 0 });
          }
        }
      },
      onPanResponderRelease: (_event, gestureState) => {
        if (gestureState.dx < -THRESHOLD / 2) {
          release(-THRESHOLD);
        } else {
          release(0);
        }

        // Always re-enable scrolling after release
        listRef.current?.setNativeProps({ scrollEnabled: true });
      },
    })
  ).current;

  const actionOpacity = pan.x.interpolate({
    inputRange: [-THRESHOLD, 0],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const actionTranslate = pan.x.interpolate({
    inputRange: [-THRESHOLD, 0],
    outputRange: [0, 40], // slide it from right
    extrapolate: "clamp",
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.actionsContainer,
          {
            opacity: actionOpacity,
            transform: [{ translateX: actionTranslate }],
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => Alert.alert("Delete")}
          style={[styles.action, styles.delete]}
        >
          <Text style={styles.actionText}>Delete</Text>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        style={[styles.item, { transform: [{ translateX: pan.x }] }]}
        {...panResponder.panHandlers}
      >
        <View style={styles.ListRow}>
          <View style={styles.contentPart}>
            <Text style={styles.heading}>{checkListCategory.titleName} </Text>
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
      </Animated.View>
    </View>
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
