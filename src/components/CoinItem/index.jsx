import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import styles from "./styles";

const CoinItem = ({ marketCoin }) => {
  const navigation = useNavigation();
  const {
    id,
    name,
    symbol,
    current_price,
    market_cap,
    market_cap_rank,
    image,
    price_change_percentage_24h,
  } = marketCoin;
  const percentageColor =
    price_change_percentage_24h < 0 ? "#ea3943" : "#16c784" || "white";

  const normalizeMarketCap = (marketCap) => {
    if (marketCap > 1e12) {
      return `${(marketCap / 1e12).toFixed(3)} T`;
    }
    if (marketCap > 1e9) {
      return `${(marketCap / 1e9).toFixed(3)} B`;
    }
    if (marketCap > 1e6) {
      return `${(marketCap / 1e6).toFixed(3)} M`;
    }
    if (marketCap > 1e3) {
      return `${(marketCap / 1e3).toFixed(3)} K`;
    }
    return marketCap;
  };
  return (
    <Pressable
      style={styles.coinContainer}
      onPress={() => {
        navigation.navigate("CoinDetails", { coinId: id });
      }}
    >
      <Image source={{ uri: image }} style={styles.coinItem} />
      <View>
        <Text style={styles.title}>{name}</Text>
        <View style={styles.rankAndPercent}>
          <View style={styles.rankView}>
            <Text style={styles.rank}>{market_cap_rank}</Text>
          </View>
          <Text style={styles.symbolText}>{symbol.toUpperCase()}</Text>
          <AntDesign
            name={price_change_percentage_24h < 0 ? "caretdown" : "caretup"}
            size={12}
            color={percentageColor}
            style={{ alignSelf: "center", marginRight: 5 }}
          />
          <Text style={{ color: percentageColor }}>
            {price_change_percentage_24h?.toFixed(2)}%
          </Text>
        </View>
      </View>
      <View style={styles.marketCap}>
        <Text style={styles.title}>{current_price}</Text>
        <Text style={{ color: "white" }}>
          Mcap {normalizeMarketCap(market_cap)}
        </Text>
      </View>
    </Pressable>
  );
};

export default CoinItem;
