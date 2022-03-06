import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  dropDownContainer: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  item: {
    padding: 10,
    marginTop: 2,
    backgroundColor: "#1e1e1e",
    borderWidth: 1,
    borderColor: "#444444",
    borderRadius: 5,
  },
  boughtQuantityContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 50,
  },
  textInput: {
    padding: 12,
    borderWidth: 1.5,
    borderColor: "#444444",
    backgroundColor: "#1e1e1e",
    color: "white",
  },
  ticker: {
    color: "grey",
    fontWeight: "700",
    fontSize: 20,
    marginTop: 25,
    marginLeft: 5,
  },
  pricePerCoin: {
    color: "grey",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  butttonContainer: {
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 30,
    marginHorizontal: 20,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "600",
  },
});

export default styles;