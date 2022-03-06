import { View, Text, Image } from "react-native";
import React from "react";
import styles from "./styles";
import { AntDesign, EvilIcons } from "@expo/vector-icons";

const PortFolioAssetItem = ({ assetItem }) => {
  const {
    currentPrice,
    image,
    name,
    priceChangePercentage,
    quantityBought,
    ticker,
  } = assetItem;

  const isChangePositive = () => priceChangePercentage >= 0;

  const renderHoldings = () => (currentPrice * quantityBought).toFixed(2);
  return (
    <View style={styles.mainCoinItemContainer}>
      <View style={styles.coinContainer}>
        <Image
          source={{ uri: image }}
          style={{ height: 30, width: 30, marginRight: 5 }}
        />
        <View>
          <Text style={styles.title}>
            {name.length > 14 ? `${name.slice(0, 7)}...` : name}
          </Text>
          <Text style={styles.ticker}>{ticker}</Text>
        </View>
      </View>
      <View style={{ alignItems: "flex-start" }}>
        <Text style={styles.title}>${currentPrice}</Text>
        <View style={styles.percentageChangeContainer}>
          <AntDesign
            name={isChangePositive() ? "caretup" : "caretdown" || "white"}
            size={12}
            color={isChangePositive() ? "#16c784" : "#ea3943"}
            style={{ alignSelf: "center", marginRight: 5 }}
          />
          <Text
            style={{
              ...styles.percentageChangeText,
              color: isChangePositive() ? "#16c784" : "#ea3943",
            }}
          >
            {priceChangePercentage?.toFixed(2)}
          </Text>
        </View>
      </View>
      <View style={styles.quantityContainer}>
        <Text style={styles.title}>${renderHoldings()}</Text>
        <Text style={styles.ticker}>
          {quantityBought} {ticker}
        </Text>
      </View>
    </View>
  );
};

export default PortFolioAssetItem;
