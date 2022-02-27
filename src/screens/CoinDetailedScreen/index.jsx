import {
  View,
  Text,
  Image,
  Dimensions,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";

import CoinDetailsHeader from "./components/CoinDetailsHeader";
import styles from "./styles";
import { AntDesign, EvilIcons } from "@expo/vector-icons";

import { LineChart } from "react-native-wagmi-charts";
import { useRoute } from "@react-navigation/native";
import { getCoinDetailData, getCoinMarketChart } from "../../services/requests";
const screenWidth = Dimensions.get("window").width;

const CoinDetailedScreen = () => {
  const [coin, setCoin] = useState(null);
  const [coinMarketData, setCoinMarketData] = useState(null);
  const route = useRoute();
  const { coinId } = route.params;

  const [loading, setLoading] = useState(false);

  const [usdValue, setUsdValue] = useState("");
  const [coinValue, setCoinValue] = useState("1");

  const fetchCoinData = async (coinId) => {
    setLoading(true);
    let coinData = await getCoinDetailData(coinId);
    let coinmarketdata = await getCoinMarketChart(coinId);
    setCoin(coinData);
    setCoinMarketData(coinmarketdata);
    setUsdValue(coinData.market_data.current_price.usd.toString());
    setLoading(false);
    console.log(coinmarketdata);
  };

  useEffect(async () => {
    fetchCoinData(coinId);
  }, []);

  if (loading || !coin || !coinMarketData) {
    return (
      <ActivityIndicator
        size={"large"}
        color={"white"}
        style={{ alignSelf: "center", justifyContent: "center", flex: 1 }}
      />
    );
  }
  const {
    image: { small },
    name,
    symbol,
    market_data: {
      market_cap_rank,
      current_price,
      price_change_percentage_24h,
    },
  } = coin;
  const { prices } = coinMarketData;
  const percentageColor =
    price_change_percentage_24h < 0 ? "#ea3943" : "#16c784" || "white";
  const chartColor = current_price.usd > prices[0][1] ? "#16c784" : "#ea3943";

  const onCoinValueChanged = (value) => {
    setCoinValue(value);
    const floatValue = parseFloat(value.replace(",", ".")) || 0;
    setUsdValue((floatValue * current_price.usd).toString());
  };

  const onUsdValueChanged = (value) => {
    setUsdValue(value);
    const floatValue = parseFloat(value.replace(",", ".")) || 0;
    setCoinValue((floatValue / current_price.usd).toString());
  };

  const formatCurrency = ({ value }) => {
    "worklet";
    if (value === "") {
      return `$${current_price.usd.toFixed(2)}`;
    }
    return `$${parseFloat(value).toFixed(2)}`;
  };

  return (
    <View style={styles.detailContainer}>
      <LineChart.Provider
        data={prices.map(([timestamp, value]) => ({ timestamp, value }))}
      >
        <CoinDetailsHeader
          image={small}
          symbol={symbol}
          marketCapRank={market_cap_rank}
        />
        <View style={styles.priceContainer}>
          <View>
            <Text style={styles.coinName}>{name}</Text>
            {/* <Text style={styles.currentPrice}>${current_price.usd}</Text> */}
            <LineChart.PriceText
              format={formatCurrency}
              style={styles.currentPrice}
            />
          </View>
          <View
            style={[
              styles.percentChangeContainer,
              { backgroundColor: percentageColor },
            ]}
          >
            <AntDesign
              name={price_change_percentage_24h < 0 ? "caretdown" : "caretup"}
              size={12}
              color={"white"}
              style={{ alignSelf: "center", marginRight: 5 }}
            />
            <Text style={styles.priceChange}>
              {price_change_percentage_24h.toFixed(2)}%
            </Text>
          </View>
        </View>
        <LineChart height={screenWidth / 2} width={screenWidth}>
          <LineChart.Path color={chartColor} width={1} />
          <LineChart.CursorCrosshair color={chartColor} />
        </LineChart>
        <View style={styles.usdConversionContainer}>
          <View style={styles.conversionValueContainer}>
            <Text style={styles.usdSymbol}>{symbol.toUpperCase()}</Text>
            <TextInput
              style={styles.conversionTextInput}
              onChangeText={onCoinValueChanged}
              value={coinValue}
              keyboardType={"numeric"}
            />
          </View>
          <View style={styles.conversionValueContainer}>
            <Text style={styles.usdSymbol}>USD</Text>
            <TextInput
              style={styles.conversionTextInput}
              onChangeText={onUsdValueChanged}
              value={usdValue}
              keyboardType={"numeric"}
            />
          </View>
        </View>
      </LineChart.Provider>
    </View>
  );
};

export default CoinDetailedScreen;
