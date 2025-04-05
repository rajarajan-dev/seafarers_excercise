import { useEffect, useState } from "react";
import { Platform, StatusBar, NativeModules } from "react-native";

const { StatusBarManager } = NativeModules;

const useStatusBarHeight = () => {
  const [statusBarHeight, setStatusBarHeight] = useState(0);

  useEffect(() => {
    if (Platform.OS === "ios") {
      StatusBarManager.getHeight((statusBarFrameData: { height: number }) => {
        setStatusBarHeight(statusBarFrameData.height);
      });
    } else {
      setStatusBarHeight(StatusBar.currentHeight || 0);
    }
  }, []);

  return statusBarHeight;
};

export default useStatusBarHeight;