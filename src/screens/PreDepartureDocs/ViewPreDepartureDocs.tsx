import { View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import GradientProgressBar from "../../components/GradientProgressBar";

const ViewPreDepartureDocs = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, marginHorizontal: 10 }}>
        <GradientProgressBar progress={80} height={10} />
      </View>
    </SafeAreaView>
  );
};

export default ViewPreDepartureDocs;
