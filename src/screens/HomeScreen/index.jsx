import { FlatList, View, RefreshControl } from "react-native";
import React, { useState, useEffect } from "react";
import CoinItem from "../../components/CoinItem";
import cryptocurrencies from "../../../assets/data/cryptocurrencies.json";
import { getCoinMarketData } from "../../services/requests";
const HomeScreen = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCoinMarketData = async (page_number) => {
    if (loading) {
      return;
    }
    setLoading(true);
    let coinaMarketData = await getCoinMarketData(page_number);
    setCoins([...coins, ...coinaMarketData]);
    setLoading(false);
  };

  const refreshControl = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    let coinaMarketData = await getCoinMarketData();
    setCoins(coinaMarketData);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoinMarketData();
  }, []);
  return (
    <FlatList
      data={coins}
      renderItem={({ item }) => {
        return <CoinItem marketCoin={item} />;
      }}
      onEndReached={fetchCoinMarketData(coins.length / 50 + 1)}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          tintColor="white"
          onRefresh={refreshControl}
        />
      }
    />
    // <View style={{ backgroundColor: "white", flex: 1 }}></View>
  );
};

export default HomeScreen;
