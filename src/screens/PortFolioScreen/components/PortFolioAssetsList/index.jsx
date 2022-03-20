import {
  View,
  Text,
  FlatList,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import styles from "./styles";
import { AntDesign, EvilIcons, FontAwesome } from "@expo/vector-icons";
import PortFolioAssetItem from "../PortFolioAssetItem";
import { useNavigation } from "@react-navigation/native";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  allPortfolioAssets,
  allPortfolioBoughtAssetsInStorage,
} from "../../../../atoms/PortFolioAssets";
import { SwipeListView } from "react-native-swipe-list-view";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PortFolioAssetsList = () => {
  const navigation = useNavigation();
  const assets = useRecoilValue(allPortfolioAssets);
  const [storageAssets, setStorageAssets] = useRecoilState(
    allPortfolioBoughtAssetsInStorage
  );

  const getCurrentBalance = () =>
    assets.reduce(
      (total, currentAccet) =>
        total + currentAccet.currentPrice * currentAccet.quantityBought,
      0
    );

  const getCurrentValueChange = () => {
    const currentBalance = getCurrentBalance();
    const boughtBalance = assets.reduce(
      (total, currentAsset) =>
        total + currentAsset.priceBought * currentAsset.quantityBought,
      0
    );

    return (currentBalance - boughtBalance).toFixed(2);
  };

  const getCurrentPercentageChange = () => {
    const currentBalance = getCurrentBalance();
    const boughtBalance = assets.reduce(
      (total, currentAsset) =>
        total + currentAsset.priceBought * currentAsset.quantityBought,
      0
    );
    return (
      (((currentBalance - boughtBalance) / boughtBalance) * 100).toFixed(2) || 0
    );
  };

  const onDeleteAsset = async (asset) => {
    const newAssets = storageAssets.filter(
      (coin, index) => coin.unique_id !== asset.item.unique_id
    );
    const jsonValue = JSON.stringify(newAssets);
    await AsyncStorage.setItem("@portfolio_coins", jsonValue);
    setStorageAssets(newAssets);
  };
  const renderDeleteButton = (data) => {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: "#EA3943",
          alignItems: "flex-end",
          justifyContent: "center",
          paddingRight: 30,
          marginLeft: 20,
        }}
        onPress={() => onDeleteAsset(data)}
      >
        <FontAwesome name="trash-o" size={24} color="white" />
      </TouchableOpacity>
    );
  };
  return (
    <SwipeListView
      data={assets}
      renderItem={({ item }) => <PortFolioAssetItem assetItem={item} />}
      rightOpenValue={-75}
      disableRightSwipe
      closeOnRowPress
      renderHiddenItem={(data) => renderDeleteButton(data)}
      keyExtractor={({ unique_id }, index) => `${unique_id}${index}`}
      ListHeaderComponent={
        <>
          <View style={styles.listHeaderContainer}>
            <View style={styles.balanceContainer}>
              <View>
                <Text style={styles.currentBalance}>Curent Balance</Text>
                <Text style={styles.currentBalanceValue}>
                  ${getCurrentBalance().toFixed(2)}
                </Text>
                <Text
                  style={{
                    ...styles.valueChange,
                    color: getCurrentValueChange() > 0 ? "#16c784" : "#ea3943",
                  }}
                >
                  ${getCurrentValueChange()}(All Time)
                </Text>
              </View>
              <View
                style={{
                  ...styles.priceChangePercentageContainer,
                  backgroundColor:
                    getCurrentPercentageChange() > 0 ? "#16c784" : "#ea3943",
                }}
              >
                <AntDesign
                  name={getCurrentValueChange() > 0 ? "caretup" : "caretdown"}
                  size={12}
                  color={"white"}
                  style={{ alignSelf: "center", marginRight: 5 }}
                />
                <Text style={styles.percentageChange}>
                  {getCurrentPercentageChange()}%
                </Text>
              </View>
            </View>
            <View>
              <Text style={styles.assetLabel}>Your Assets</Text>
            </View>
          </View>
        </>
      }
      ListFooterComponent={
        <>
          <View style={styles.listFooterContainer}>
            <Pressable
              style={styles.butttonContainer}
              onPress={() => navigation.navigate("AddNewAsset")}
            >
              <Text style={styles.buttonText}>Add New Asset</Text>
            </Pressable>
          </View>
        </>
      }
    />
  );
};

export default PortFolioAssetsList;
