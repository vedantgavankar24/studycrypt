import axios from "axios";

export const fetchPrices = async (cryptos: string[], currencies: string[]) => {
  const BASE_URL = "https://api.coingecko.com/api/v3/simple/price";

  try {
    const cryptoList = cryptos.join(",");
    const currencyList = currencies.join(",");

    const response = await axios.get(BASE_URL, {
      params: {
        ids: cryptoList,
        vs_currencies: currencyList,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error("Error fetching prices from CoinGecko API");
  }
};
