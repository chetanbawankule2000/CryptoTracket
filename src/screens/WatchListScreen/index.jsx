import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import CoinItem from "../../components/CoinItem";
import { useWatchList } from "../../context/WatchlistContext";
import { getWatchListedCoin } from "../../services/requests";
const WatchListScreen = () => {
  const { watchListCoinIds } = useWatchList();
  console.log("length is ", watchListCoinIds.length);

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(null);

  const transFormCoinIds = () => watchListCoinIds.join("%2C");
  console.log(transFormCoinIds());
  const fetchWatchListedCoin = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    let watchListCoin = await getWatchListedCoin(1, transFormCoinIds());
    // setCoins([...coins, ...watchListCoin]);
    console.log("from api ", watchListCoin);
    setCoins(watchListCoin);
    setLoading(false);
  };

  useEffect(() => {
    if (watchListCoinIds.length > 0) {
      fetchWatchListedCoin();
    }
    setCoins(watchListCoinIds);
  }, [watchListCoinIds]);
  console.log("onWatchlist screen", watchListCoinIds);
  if (loading) {
    return (
      <ActivityIndicator
        size={"large"}
        color="white"
        style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
      />
    );
  }
  return (
    <FlatList
      data={coins}
      renderItem={({ item }) => <CoinItem marketCoin={item} />}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          tintColor="white"
          onRefresh={watchListCoinIds.length > 0 ? fetchWatchListedCoin : null}
        />
      }
    />
  );
};

export default WatchListScreen;
