import { View, Text } from "react-native";
import React, { useContext, createContext, useState, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

const WatchlistContext = createContext();

export const useWatchList = () => useContext(WatchlistContext);

const WatchlistProvider = ({ children }) => {
  const [watchListCoinIds, setWatchListCoinIds] = useState([]);

  const getWatchListData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@watchlist_coins");
      setWatchListCoinIds(jsonValue != null ? JSON.parse(jsonValue) : []);
    } catch (err) {
      console.log(err);
    }
  };

  const storeWatchListCoinId = async (coinId) => {
    try {
      const newWatchList = [...watchListCoinIds, coinId];

      const jsonValue = JSON.stringify(newWatchList);
      await AsyncStorage.setItem("@watchlist_coins", jsonValue);
      setWatchListCoinIds(newWatchList);
    } catch (e) {
      console.log(e);
    }
  };

  const removeWatchListCoinId = async (coinId) => {
    try {
      const newWatchList = watchListCoinIds.filter(
        (coinIdValue) => coinIdValue != coinId
      );
      const jsonValue = JSON.stringify(newWatchList);
      await AsyncStorage.setItem("@watchlist_coins", jsonValue);
      setWatchListCoinIds(newWatchList);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getWatchListData();
  }, []);
  return (
    <WatchlistContext.Provider
      value={{ watchListCoinIds, storeWatchListCoinId, removeWatchListCoinId }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};

export default WatchlistProvider;
