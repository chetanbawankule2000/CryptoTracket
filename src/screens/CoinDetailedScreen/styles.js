import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  detailContainer: {
    paddingHorizontal: 15,
  },
  coinName: {
    color: "white",
    fontSize: 15,
    opacity: 0.5,
  },
  currentPrice: {
    color: "white",
    fontSize: 30,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  priceContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  percentChangeContainer: {
    flexDirection: "row",
    padding: 5,
    paddingVertical: 0,
    borderRadius: 10,
    alignItems: "center",
    height: "50%",
    alignSelf: "center",
  },
  priceChange: {
    fontSize: 17,
    fontWeight: "500",
    color: "white",
  },
  usdConversionContainer: {
    flexDirection: "row",
  },
  conversionValueContainer: {
    flex: 1,
    flexDirection: "row",
  },
  usdSymbol: {
    fontSize: 16,
    color: "white",
    alignSelf: "center",
  },
  conversionTextInput: {
    flex: 1,
    borderBottomColor: "white",
    borderBottomWidth: 1,
    fontSize: 16,
    color: "white",
    padding: 10,
    marginRight: 10,
  },
});

export default styles;
