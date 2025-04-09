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
import IconCheck from "../assets/icons/iconDone.svg";
import IconUndo from "../assets/icons/iconUnDone.svg";
import { Colors, Typography } from "../theme";

type Props = {
  children: React.ReactNode;
  onDelete: () => void;
  onToggle: () => void;
  setScrolling: (enabled: boolean) => void;
  isTodo: boolean;
};

export type SwipeableSectionRowRef = {
  close: () => void;
};

const ACTION_WIDTH = 90;

const SwipeableSectionRow = forwardRef<SwipeableSectionRowRef, Props>(
  ({ children, onDelete, onToggle, setScrolling, isTodo }, ref) => {
    const actionCount = isTodo ? 2 : 1;
    const THRESHOLD = ACTION_WIDTH * actionCount;
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
      outputRange: [0, THRESHOLD],
      extrapolate: "clamp",
    });

    return (
      <View style={styles.wrapper}>
        {/* Actions */}
        <Animated.View
          style={[
            styles.actionsContainer,
            {
              opacity: actionOpacity,
              transform: [{ translateX: actionTranslate }],
            },
          ]}
        >
          {/* Delete Button (Only when item is Todo) */}
          {isTodo && (
            <TouchableOpacity
              onPress={() => {
                release(0);
                setTimeout(() => {
                  onDelete();
                }, 200); // Match animation duration
              }}
              style={[styles.action, styles.delete]}
            >
              <IconTrashCan width={24} height={24} fill="#fff" />
              <Text style={styles.actionText}>Delete</Text>
            </TouchableOpacity>
          )}

          {/* Toggle Button */}
          <TouchableOpacity
            onPress={() => {
              release(0); // Close first
              setTimeout(() => {
                onToggle(); // Then perform toggle
              }, 200); // Wait for animation to complete
            }}
            style={[styles.action, styles.toggle]}
          >
            {isTodo ? (
              <>
                <IconCheck width={24} height={24} fill="#fff" />
                <Text style={styles.actionText}>Done</Text>
              </>
            ) : (
              <>
                <IconUndo width={24} height={24} fill="#fff" />
                <Text style={styles.actionText}>Undone</Text>
              </>
            )}
          </TouchableOpacity>
        </Animated.View>

        {/* Swipable Content */}
        <Animated.View
          style={[
            styles.item,
            {
              transform: [{ translateX: pan.x }],
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
    borderRadius: 0,
    overflow: "hidden",
    width: "100%",
    position: "relative",
    backgroundColor: "transparent",
  },
  item: {
    width: "100%",
    backgroundColor: "transparent",
    overflow: "hidden",
  },
  actionsContainer: {
    position: "absolute",
    right: 0,
    height: "100%",
    flexDirection: "row",
    overflow: "hidden",
  },
  action: {
    width: ACTION_WIDTH,
    justifyContent: "center",
    alignItems: "center",
  },
  toggle: {
    backgroundColor: Colors.green600,
  },
  delete: {
    backgroundColor: Colors.red500,
  },
  actionText: {
    color: "white",
    fontSize: 12,
    fontFamily: Typography.fontFamily.RobotoMedium,
    textTransform: "none",
    marginTop: 5,
  },
});

export default SwipeableSectionRow;
