import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, FlatList } from "react-native";
import HomeScreen from "./src/screens/HomeScreen";
import CoinDetailedScreen from "./src/screens/CoinDetailedScreen";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./src/navigation";

export default function App() {
  return (
    <NavigationContainer
      theme={{
        colors: {
          backgroungd: "#121212",
        },
      }}
    >
      <View style={styles.container}>
        <StatusBar backgroundColor="white" />
        <Navigation />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingTop: 50,
  },
});
