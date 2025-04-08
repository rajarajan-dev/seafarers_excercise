import React, { useRef, useImperativeHandle, forwardRef } from "react";
import {
  Animated,
  PanResponder,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import IconCheck from "../assets/icons/iconDone.svg";
import IconUndo from "../assets/icons/iconUnDone.svg";
import IconSkipped from "../assets/icons/iconSkip.svg";
import { Colors, Typography } from "../theme";
import { DocumentItem, DocumentStatus } from "../types/PreDepartureDocsTypes";

type Props = {
  item: DocumentItem;
  children: React.ReactNode;
  onStatusChange: (newStatus: DocumentStatus) => void;
  setScrolling: (enabled: boolean) => void;
};

export type SwipeablePreDepartureSectionRowRef = {
  close: () => void;
};

const ACTION_WIDTH = 90;

const SwipeablePreDepartureSectionRow = forwardRef<
  SwipeablePreDepartureSectionRowRef,
  Props
>(({ item, children, onStatusChange, setScrolling }, ref) => {
  const actionCount =
    item.type === "Optional" && item.status === "Todo" ? 2 : 1;
  const THRESHOLD = ACTION_WIDTH * actionCount;
  const pan = useRef(new Animated.ValueXY()).current;
  const actionTimeout = useRef<NodeJS.Timeout | null>(null);

  // Clean up any pending timeouts when component unmounts
  React.useEffect(() => {
    return () => {
      if (actionTimeout.current) {
        clearTimeout(actionTimeout.current);
      }
    };
  }, []);

  const release = (distance: number) => {
    Animated.timing(pan, {
      toValue: { x: distance, y: 0 },
      duration: 200,
      useNativeDriver: true, // Changed to true for better performance
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

  // Determine action button
  let actionLabel: string | null = null;
  let icon = null;
  let targetStatus: DocumentStatus | null = null;

  if (
    (item.type === "Mandatory" || item.type === "Optional") &&
    item.status === "Todo"
  ) {
    actionLabel = "Done";
    icon = <IconCheck width={24} height={24} fill="#fff" />;
    targetStatus = "Done";
  } else if (item.type === "AttentionRequired" && item.status === "Todo") {
    actionLabel = "Submitted";
    icon = <IconCheck width={24} height={24} fill="#00f" />;
    targetStatus = "Submitted";
  } else if (
    (item.type === "Mandatory" || item.type === "Optional") &&
    (item.status === "Done" || item.status === "Skipped")
  ) {
    actionLabel = "Uncheck";
    icon = <IconUndo width={24} height={24} fill="#fff" />;
    targetStatus = "Todo";
  }

  const handleAction = () => {
    if (!targetStatus) return;

    release(0);

    // Clear any pending timeout
    if (actionTimeout.current) {
      clearTimeout(actionTimeout.current);
    }

    // Schedule the status change after animation completes
    actionTimeout.current = setTimeout(() => {
      onStatusChange(targetStatus!);
    }, 200);
  };

  const handleSkip = () => {
    release(0);

    // Clear any pending timeout
    if (actionTimeout.current) {
      clearTimeout(actionTimeout.current);
    }

    // Schedule the status change after animation completes
    actionTimeout.current = setTimeout(() => {
      onStatusChange("Skipped");
    }, 200);
  };

  return (
    <View style={styles.wrapper}>
      {/* Swipe Action */}
      {targetStatus && (
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
            onPress={handleAction}
            style={[styles.action, styles.toggle]}
          >
            {icon}
            <Text style={styles.actionText}>{actionLabel}</Text>
          </TouchableOpacity>
          {/* Skip Button (Only when item is Optional & Todo) */}
          {item.type === "Optional" && item.status === "Todo" && (
            <TouchableOpacity
              onPress={handleSkip}
              style={[styles.action, styles.toggle]}
            >
              <IconSkipped width={24} height={24} fill="#fff" />
              <Text style={styles.actionText}>Skip</Text>
            </TouchableOpacity>
          )}
        </Animated.View>
      )}

      {/* Swipeable Content */}
      <Animated.View
        style={[styles.item, { transform: [{ translateX: pan.x }] }]}
        {...panResponder.panHandlers}
      >
        {children}
      </Animated.View>
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    overflow: "hidden",
    width: "100%",
    position: "relative",
    backgroundColor: "transparent",
  },
  item: {
    width: "100%",
    backgroundColor: "transparent",
  },
  actionsContainer: {
    position: "absolute",
    right: 0,
    height: "100%",
    flexDirection: "row",
  },
  action: {
    width: ACTION_WIDTH,
    justifyContent: "center",
    alignItems: "center",
  },
  toggle: {
    backgroundColor: Colors.green600,
  },
  actionText: {
    color: "white",
    fontSize: 12,
    fontFamily: Typography.fontFamily.RobotoMedium,
    textTransform: "uppercase",
  },
});

export default SwipeablePreDepartureSectionRow;
