import { View, Text, Image } from "react-native";
import React from "react";
import { AntDesign, EvilIcons } from "@expo/vector-icons";
import styles from "./styles";

const CoinDetailsHeader = (props) => {
  const { image, symbol, marketCapRank } = props;

  return (
    <View style={styles.headerContainer}>
      <AntDesign name="arrowleft" size={25} color="white" />
      <View style={styles.tickerContainer}>
        <Image source={{ uri: image }} style={{ height: 25, width: 25 }} />
        <Text style={styles.coinSymbol}>{symbol.toUpperCase()}</Text>
        <View style={styles.coinRankContainer}>
          <Text style={styles.coinRank}>#{marketCapRank}</Text>
        </View>
      </View>
      <EvilIcons name="user" size={30} color="white" />
    </View>
  );
};

export default CoinDetailsHeader;