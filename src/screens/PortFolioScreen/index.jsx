import { View, Text, FlatList, ActivityIndicator, LogBox } from "react-native";
import React, { Suspense } from "react";
import PortFolioAssetsList from "./components/PortFolioAssetsList";
// Ignore log notification by message:
LogBox.ignoreLogs(["Warning: ..."]);

// Ignore all log notifications:
LogBox.ignoreAllLogs();
const PortFolioScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <Suspense
        fallback={
          <ActivityIndicator
            size={"large"}
            color={"white"}
            style={{ alignItems: "center", justifyContent: "center" }}
          />
        }
      >
        <PortFolioAssetsList />
      </Suspense>
    </View>
  );
};

export default PortFolioScreen;
