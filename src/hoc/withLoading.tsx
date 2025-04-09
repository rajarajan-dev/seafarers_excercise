// hoc/withLoading.tsx
import React from "react";
import { View, StyleSheet, Image, StyleProp, ViewStyle } from "react-native";
import { useLoading } from "../context/LoadingContext";
import IconLoading from "../assets/icons/iconLoading.svg";

type WithLoadingProps = {
  loadingStyle?: StyleProp<ViewStyle>;
};

const withLoading = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const HOC = (props: P & WithLoadingProps) => {
    const { loadingStyle, ...rest } = props;
    const { isLoading } = useLoading();

    return (
      <View style={{ flex: 1 }}>
        <WrappedComponent {...(rest as P)} />
        {isLoading && (
          <View style={[styles.loadingOverlay, loadingStyle]}>
            <IconLoading height={100} width={100} />
          </View>
        )}
      </View>
    );
  };

  return HOC;
};

const styles = StyleSheet.create({
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  loadingImage: {
    width: 60,
    height: 60,
  },
});

export default withLoading;
