import axios from "axios";

const COINDETAIL = `https://api.coingecko.com/api/v3/coins`;

export const getCoinDetailData = async (coinId) => {
  try {
    const response = await axios.get(`${COINDETAIL}/${coinId}`, {
      params: {
        localization: false,
        tickers: false,
        market_data: true,
        community_data: false,
        developer_data: false,
        sparkline: false,
      },
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const getCoinMarketChart = async (coinId) => {
  try {
    const response = await axios.get(`${COINDETAIL}/${coinId}/market_chart`, {
      params: {
        vs_currency: "usd",
        days: 1,
        interval: "hourly",
      },
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
export const getCoinMarketData = async (page_number = 1) => {
  try {
    const response = await axios.get(`${COINDETAIL}/markets`, {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 50,
        page: page_number,
        sparkline: false,
        price_change_percentage: "24h",
      },
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
