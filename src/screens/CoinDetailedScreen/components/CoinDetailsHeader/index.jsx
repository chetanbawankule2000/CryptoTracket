import { View, Text, Image } from "react-native";
import React from "react";
import { AntDesign, EvilIcons, FontAwesome } from "@expo/vector-icons";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useWatchList } from "../../../../context/WatchlistContext";
const CoinDetailsHeader = (props) => {
  const { coinId, image, symbol, marketCapRank } = props;
  console.log("coinId", coinId);
  const navigation = useNavigation();
  const { watchListCoinIds, storeWatchListCoinId, removeWatchListCoinId } =
    useWatchList();

  const checkIfCoinIsWatchListed = () =>
    watchListCoinIds.some((coinIdValue) => coinIdValue === coinId);

  const handleWatchListCoinIds = () => {
    if (checkIfCoinIsWatchListed()) {
      return removeWatchListCoinId(coinId);
    }
    return storeWatchListCoinId(coinId);
  };

  return (
    <View style={styles.headerContainer}>
      <AntDesign
        name="arrowleft"
        size={25}
        color="white"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.tickerContainer}>
        <Image source={{ uri: image }} style={{ height: 25, width: 25 }} />
        <Text style={styles.coinSymbol}>{symbol.toUpperCase()}</Text>
        <View style={styles.coinRankContainer}>
          <Text style={styles.coinRank}>#{marketCapRank}</Text>
        </View>
      </View>
      <FontAwesome
        name={checkIfCoinIsWatchListed() ? "star" : "star-o"}
        size={24}
        color={checkIfCoinIsWatchListed() ? "#FFBF00" : "white"}
        onPress={handleWatchListCoinIds}
      />
    </View>
  );
};

export default CoinDetailsHeader;
