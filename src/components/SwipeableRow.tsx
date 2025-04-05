import React, { useRef, useImperativeHandle, forwardRef } from "react";
import {
  Animated,
  PanResponder,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import IconTrashCan from "../assets/icons/iconTrashCan.svg";
import { Colors, Typography } from "../theme";

type Props = {
  children: React.ReactNode;
  onDelete: () => void;
  setScrolling: (enabled: boolean) => void;
};

export type SwipeableRowRef = {
  close: () => void;
};

const THRESHOLD = 90;

const SwipeableRow = forwardRef<SwipeableRowRef, Props>(
  ({ children, onDelete, setScrolling }, ref) => {
    const pan = useRef(new Animated.ValueXY()).current;

    const release = (distance: number) => {
      Animated.timing(pan, {
        toValue: { x: distance, y: 0 },
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        setScrolling(true);
      });
    };

    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (_evt, gestureState) =>
          Math.abs(gestureState.dx) > Math.abs(gestureState.dy),
        onPanResponderMove: (_evt, gestureState) => {
          if (gestureState.dx < 0) {
            setScrolling(false);
            pan.setValue({ x: Math.max(gestureState.dx, -THRESHOLD), y: 0 });
          }
        },
        onPanResponderRelease: (_evt, gestureState) => {
          if (gestureState.dx < -THRESHOLD / 2) {
            release(-THRESHOLD);
          } else {
            release(0);
          }
        },
      })
    ).current;

    useImperativeHandle(ref, () => ({
      close: () => release(0),
    }));

    const actionOpacity = pan.x.interpolate({
      inputRange: [-THRESHOLD, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });

    const actionTranslate = pan.x.interpolate({
      inputRange: [-THRESHOLD, 0],
      outputRange: [0, 45],
      extrapolate: "clamp",
    });

    const borderRadius = pan.x.interpolate({
      inputRange: [-THRESHOLD, 0],
      outputRange: [0, 6], // 12px when at rest, 0 when swiped
      extrapolate: "clamp",
    });

    return (
      <View style={styles.wrapper}>
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
            onPress={() => {
              onDelete();
              release(0); // Close after delete
            }}
            style={[styles.action, styles.delete]}
          >
            <IconTrashCan width={24} height={24} fill="#fff" />
            <Text style={styles.actionText}>Delete</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          style={[
            styles.item,
            {
              transform: [{ translateX: pan.x }],
              borderTopRightRadius: borderRadius,
              borderBottomRightRadius: borderRadius,
            },
          ]}
          {...panResponder.panHandlers}
        >
          {children}
        </Animated.View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 6,
    overflow: "hidden",
    width: "100%",
    position: "relative",
    backgroundColor: "transparent", // transparent wrapper
  },
  item: {
    width: "100%",
    borderRadius: 6,
    overflow: "hidden", // important to clip inner content like background
    backgroundColor: "white",
  },
  actionsContainer: {
    position: "absolute",
    right: 0,
    height: "100%",
    flexDirection: "row",
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    overflow: "hidden",
  },
  action: {
    width: 90,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  actionIcon: {
    marginBottom: 2, // or marginRight if using row layout
  },
  delete: {
    backgroundColor: Colors.red500,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },
  actionText: {
    color: "white",
    fontSize: 12,
    fontFamily: Typography.fontFamily.RobotoMedium,
    textTransform: "uppercase",
  },
});

export default SwipeableRow;
