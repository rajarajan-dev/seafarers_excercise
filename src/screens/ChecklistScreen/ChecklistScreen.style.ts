import { StyleSheet } from "react-native";
import { Colors, Typography } from "../../theme";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.nav30, paddingHorizontal: 16 },
  floatingAddIcon: {
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    position: "absolute",
    bottom: 30,
    right: 10,
    height: 100,
  },
});

export default styles;
