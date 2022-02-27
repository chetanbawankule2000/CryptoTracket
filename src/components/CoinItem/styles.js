import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  coinContainer: {
    padding: 15,
    flexDirection: "row",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#282828",
  },
  marketCap: {
    alignItems: "flex-end",
    marginLeft: "auto",
  },
  symbolText: {
    color: "white",
    marginRight: 5,
  },
  coinItem: {
    height: 30,
    width: 30,
    marginRight: 10,
    alignSelf: "center",
  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 3,
  },
  rankAndPercent: {
    flexDirection: "row",
  },
  rankView: {
    backgroundColor: "#585858",
    paddingHorizontal: 5,
    borderRadius: 5,
    marginRight: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  rank: {
    fontWeight: "bold",
    color: "white",
  },
});

export default styles;
