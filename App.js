import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import WatchlistProvider from "./src/context/WatchlistContext";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./src/navigation";
import { RecoilRoot } from "recoil";
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size={"large"} />;
  }
  return (
    <NavigationContainer
      theme={{
        colors: {
          backgroungd: "#121212",
        },
      }}
    >
      <RecoilRoot>
        <WatchlistProvider>
          <View style={styles.container}>
            <StatusBar backgroundColor="white" />
            <Navigation />
          </View>
        </WatchlistProvider>
      </RecoilRoot>
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
