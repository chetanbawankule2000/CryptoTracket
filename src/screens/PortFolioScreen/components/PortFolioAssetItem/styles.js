import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  mainCoinItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#121212",
  },
  coinContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  ticker: {
    color: "grey",
    fontWeight: "600",
  },
  percentageChangeContainer: {
    flexDirection: "row",
    // alignItems: "flex-end",
  },
  percentageChangeText: {
    fontWeight: "600",
  },
  quantityContainer: {
    alignItems: "flex-end",
  },
});

export default styles;
