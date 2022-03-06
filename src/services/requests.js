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
export const getWatchListedCoin = async (page_number, coinIds) => {
  console.log(page_number, "request page");
  try {
    //const response = await axios.get(`${COINDETAIL}/markets`, {
    //   params: {
    //     vs_currency: "usd",
    //     ids: coinIds,
    //     order: "market_cap_desc",
    //     per_page: 50,
    //     page: page_number,
    //     sparkline: false,
    //     price_change_percentage: "24h",
    //   },
    // });
    // console.log("response is ", response.data);
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIds}&order=market_cap_desc&per_page=50&page=${page_number}&sparkline=false&price_change_percentage=24h`
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const getAllCoins = async () => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/list?include_platform=false`
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
