import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import SearchableDropDown from "react-native-searchable-dropdown";
import styles from "./styles";
import { useRecoilState } from "recoil";
import { allPortfolioBoughtAssetsInStorage } from "../../atoms/PortFolioAssets";
import { getAllCoins, getCoinDetailData } from "../../services/requests";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import uuid from "react-native-uuid";

const AddNewAssetScreen = () => {
  const navigation = useNavigation();

  const [allCoin, SetAllCoin] = useState([]);
  const [loading, setLoading] = useState(false);
  const [boughtAssetQuantity, setBoughtAssetQuantity] = useState("");
  const [assetsInStorage, setAssetsInStorage] = useRecoilState(
    allPortfolioBoughtAssetsInStorage
  );
  const [selectedCoinId, setSelectedCoinId] = useState(null);
  const [selectedCoin, setSelectedCoin] = useState(null);

  // console.log(selectedCoin);

  const isQuantityEntred = () => boughtAssetQuantity === "";

  const fetchAllCoins = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const allCoins = await getAllCoins();
    SetAllCoin(allCoins);
    setLoading(false);
  };

  const fetchCoinInfo = async (coinId) => {
    if (loading) {
      return;
    }
    setLoading(true);
    const coinInfo = await getCoinDetailData(coinId);
    setSelectedCoin(coinInfo);
    setLoading(false);
  };

  useEffect(() => {
    fetchAllCoins();
  }, []);

  useEffect(() => {
    if (selectedCoinId) {
      fetchCoinInfo(selectedCoinId);
    }
  }, [selectedCoinId]);

  const onAddNewAsset = async () => {
    const newAsset = {
      id: selectedCoin.id,
      unique_id: selectedCoin.id + uuid.v4(),
      name: selectedCoin.name,
      image: selectedCoin.image.small,
      ticker: selectedCoin.symbol.toUpperCase(),
      quantityBought: parseFloat(boughtAssetQuantity),
      priceBought: selectedCoin.market_data.current_price.usd,
    };

    const newAssets = [...assetsInStorage, newAsset];
    const jsonValue = JSON.stringify(newAssets);
    await AsyncStorage.setItem("@portfolio_coins", jsonValue);
    setAssetsInStorage(newAssets);
    navigation.goBack();
  };
  return (
    <View style={{ flex: 1 }}>
      <SearchableDropDown
        items={allCoin}
        onItemSelect={(item) => setSelectedCoinId(item.id)}
        containerStyle={styles.dropDownContainer}
        itemStyle={styles.item}
        itemTextStyle={{ color: "white" }}
        resetValue={false}
        placeholder={selectedCoinId || "Select a coin..."}
        placeholderTextColor={"white"}
        textInputProps={{
          underlineColorAndroid: "transparent",
          style: {
            padding: 12,
            borderRadius: 5,
            borderWidth: 1.5,
            borderColor: "#444444",
            backgroundColor: "#1e1e1e",
            color: "white",
          },
        }}
      />
      {selectedCoin && (
        <>
          <View style={styles.boughtQuantityContainer}>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                placeholder="0"
                placeholderTextColor={"grey"}
                style={{ color: "white", fontSize: 90 }}
                value={boughtAssetQuantity.toString()}
                keyboardType={"numeric"}
                onChangeText={setBoughtAssetQuantity}
              />
              <Text style={styles.ticker}>
                {selectedCoin.symbol.toUpperCase()}
              </Text>
            </View>
            <Text style={styles.pricePerCoin}>
              ${selectedCoin.market_data.current_price.usd} per coin
            </Text>
          </View>
          <TouchableOpacity
            style={{
              ...styles.butttonContainer,
              backgroundColor: isQuantityEntred() ? "#303030" : "#4169E1",
            }}
            onPress={onAddNewAsset}
            disabled={isQuantityEntred()}
          >
            <Text
              style={{
                ...styles.buttonText,
                color: isQuantityEntred() ? "grey" : "white",
              }}
            >
              Add New Asset
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default AddNewAssetScreen;
