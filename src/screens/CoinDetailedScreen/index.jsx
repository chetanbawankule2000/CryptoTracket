import {
  View,
  Text,
  Image,
  Dimensions,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";

import CoinDetailsHeader from "./components/CoinDetailsHeader";
import styles from "./styles";
import { AntDesign, EvilIcons, MaterialIcons } from "@expo/vector-icons";

import { LineChart, CandlestickChart } from "react-native-wagmi-charts";
import { useRoute } from "@react-navigation/native";
import {
  getCoinDetailData,
  getCoinMarketChart,
  getCandleChartData,
} from "../../services/requests";
import FilterComponent from "./components/FilterComponent";

const screenWidth = Dimensions.get("window").width;

const filterDaysArray = [
  { filterDay: "1", filterText: "24h" },
  { filterDay: "7", filterText: "7d" },
  { filterDay: "30", filterText: "30d" },
  { filterDay: "365", filterText: "1y" },
  { filterDay: "max", filterText: "All" },
];

const CoinDetailedScreen = () => {
  const [coin, setCoin] = useState(null);
  const [coinMarketData, setCoinMarketData] = useState(null);
  const [coinMarketCandelChart, setCoinMarketCandelChart] = useState(null);
  const [selectedRange, setselectedRange] = useState(1);
  const [isCandelChartVisible, setIsCandelChartVisible] = useState(false);
  const route = useRoute();
  const { coinId } = route.params;

  const [loading, setLoading] = useState(false);

  const [usdValue, setUsdValue] = useState("");
  const [coinValue, setCoinValue] = useState("1");

  const fetchCoinData = async (coinId) => {
    setLoading(true);
    let coinData = await getCoinDetailData(coinId);
    setCoin(coinData);
    setUsdValue(coinData.market_data.current_price.usd.toString());
    setLoading(false);
    // console.log(coinmarketdata);
  };

  const fetchCoinMarketData = async (selectedRangeValue) => {
    let coinmarketdata = await getCoinMarketChart(coinId, selectedRangeValue);
    setCoinMarketData(coinmarketdata);
  };

  const fetchCandleStickChatDate = async (selectedRangeValue) => {
    let candelStickChartData = await getCandleChartData(
      coinId,
      selectedRangeValue
    );
    setCoinMarketCandelChart(candelStickChartData);
  };

  useEffect(async () => {
    fetchCoinData(coinId);
    fetchCoinMarketData(1);
    fetchCandleStickChatDate();
  }, []);

  const onSelectedRangeChange = (selectedRangeValue) => {
    setselectedRange(selectedRangeValue);
    fetchCoinMarketData(selectedRangeValue);
    fetchCandleStickChatDate(selectedRangeValue);
  };

  const memoOnSelectedRange = useCallback(
    (range) => onSelectedRangeChange(range),
    []
  );

  if (loading || !coin || !coinMarketData || !coinMarketCandelChart) {
    return (
      <ActivityIndicator
        size={"large"}
        color={"white"}
        style={{ alignSelf: "center", justifyContent: "center", flex: 1 }}
      />
    );
  }
  const {
    id,
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
      if (current_price.usd < 1) {
        return `$${current_price.usd}`;
      }
      return `$${current_price.usd.toFixed(2)}`;
    }
    if (current_price.usd < 1) {
      return `$${parseFloat(value)}`;
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
          coinId={id}
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
        <View style={styles.filterContainer}>
          {filterDaysArray.map((day) => (
            <FilterComponent
              key={day.filterText}
              filterDay={day.filterDay}
              filterText={day.filterText}
              selectedRange={selectedRange}
              setSelectedRang={memoOnSelectedRange}
            />
          ))}
          {isCandelChartVisible ? (
            <MaterialIcons
              name="show-chart"
              size={24}
              color="#16c784"
              onPress={() => setIsCandelChartVisible(false)}
            />
          ) : (
            <MaterialIcons
              name="waterfall-chart"
              size={24}
              color="#16c784"
              onPress={() => setIsCandelChartVisible(true)}
            />
          )}
        </View>
        {isCandelChartVisible ? (
          <CandlestickChart.Provider
            data={coinMarketCandelChart.map(
              ([timestamp, open, high, low, close]) => ({
                timestamp,
                open,
                high,
                low,
                close,
              })
            )}
          >
            <CandlestickChart height={screenWidth / 2} width={screenWidth}>
              <CandlestickChart.Candles />
              <CandlestickChart.Crosshair>
                <CandlestickChart.Tooltip />
              </CandlestickChart.Crosshair>
            </CandlestickChart>
            <View style={styles.candleStickDataContainer}>
              <View>
                <Text style={styles.candleStickTextLabel}>Open</Text>
                <CandlestickChart.PriceText
                  style={styles.candleStickText}
                  type="open"
                />
              </View>
              <View>
                <Text style={styles.candleStickTextLabel}>High</Text>
                <CandlestickChart.PriceText
                  style={styles.candleStickText}
                  type="high"
                />
              </View>
              <View>
                <Text style={styles.candleStickTextLabel}>Low</Text>
                <CandlestickChart.PriceText
                  style={styles.candleStickText}
                  type="low"
                />
              </View>
              <View>
                <Text style={styles.candleStickTextLabel}>Close</Text>
                <CandlestickChart.PriceText
                  style={styles.candleStickText}
                  type="close"
                />
              </View>
            </View>
            <CandlestickChart.DatetimeText
              style={{ color: "white", fontWeight: "700", margin: 10 }}
            />
          </CandlestickChart.Provider>
        ) : (
          <LineChart height={screenWidth / 2} width={screenWidth}>
            <LineChart.Path color={chartColor} />
            <LineChart.CursorCrosshair color={chartColor} />
          </LineChart>
        )}
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
