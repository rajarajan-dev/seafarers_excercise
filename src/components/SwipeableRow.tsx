import React, {
    useRef,
    useImperativeHandle,
    forwardRef,
  } from "react";
import {
  Animated,
  PanResponder,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from "react-native";

type Props = {
  children: React.ReactNode;
  onDelete: () => void;
  setScrolling: (enabled: boolean) => void;
};

export type SwipeableRowRef = {
  close: () => void;
};

const THRESHOLD = 80;

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
      outputRange: [0, 40],
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
            onPress={() => {
              onDelete();
              release(0); // Close after delete
            }}
            style={[styles.action, styles.delete]}
          >
            <Text style={styles.actionText}>Delete</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          style={[styles.item, { transform: [{ translateX: pan.x }] }]}
          {...panResponder.panHandlers}
        >
          {children}
        </Animated.View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
  },
  item: {
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
  delete: {
    backgroundColor: "#F44336",
  },
  actionText: {
    color: "white",
    fontSize: 16,
  },
});

export default SwipeableRow;
