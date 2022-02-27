import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, FlatList } from "react-native";
import HomeScreen from "./src/screens/HomeScreen";
import CoinDetailedScreen from "./src/screens/CoinDetailedScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" />
      {/* <HomeScreen /> */}
      <CoinDetailedScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingTop: 50,
  },
});
