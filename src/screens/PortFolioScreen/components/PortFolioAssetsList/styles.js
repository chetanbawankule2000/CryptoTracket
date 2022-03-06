import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  listHeaderContainer: {
    paddingHorizontal: 10,
  },
  currentBalance: {
    color: "white",
    fontWeight: "600",
    fontSize: 15,
  },
  currentBalanceValue: {
    color: "white",
    fontSize: 40,
    fontWeight: "700",
    letterSpacing: 1,
  },
  valueChange: {
    fontWeight: "600",
    fontSize: 15,
  },
  percentageChange: {
    color: "white",
    fontWeight: "500",
    fontSize: 17,
  },
  balanceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceChangePercentageContainer: {
    flexDirection: "row",
    paddingHorizontal: 4,
    paddingVertical: 8,
    borderRadius: 10,
  },
  assetLabel: {
    color: "white",
    fontSize: 23,
    fontWeight: "700",
    marginTop: 20,
  },
  listFooterContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  butttonContainer: {
    // position: "absolute",
    // bottom: 0,
    backgroundColor: "#4169E1",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 25,
  },
  buttonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "600",
  },
});

export default styles;
