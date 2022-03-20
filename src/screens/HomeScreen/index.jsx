import React, { useState, useEffect } from "react";
import {
  FlatList,
  View,
  RefreshControl,
  ActivityIndicator,
  Text,
} from "react-native";
import CoinItem from "../../components/CoinItem";
import { getCoinMarketData } from "../../services/requests";
const HomeScreen = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCoinMarketData = async (page_number) => {
    if (loading) {
      return;
    }
    setLoading(true);
    const coinaMarketData = await getCoinMarketData(page_number);
    setCoins([...coins, ...coinaMarketData]);
    setLoading(false);
  };

  const refreshCoins = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const coinaMarketData = await getCoinMarketData();
    // console.log("coin data is ", coinaMarketData);
    setCoins(coinaMarketData);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoinMarketData();
  }, []);

  return (
    <View>
      <Text
        style={{
          color: "white",
          fontSize: 25,
          letterSpacing: 1,
          paddingHorizontal: 20,
          paddingBottom: 5,
          fontFamily: "Inter_900Black",
        }}
      >
        Cryptoassets
      </Text>
      <FlatList
        data={coins}
        renderItem={({ item }) => <CoinItem marketCoin={item} />}
        onEndReached={() => fetchCoinMarketData(coins.length / 50 + 1)}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            tintColor="white"
            onRefresh={refreshCoins}
          />
        }
      />
    </View>
  );
};

export default HomeScreen;
