import axios from "axios";

export const fetchCryptoPrices = async () => {
  try {
    const { data } = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd,eur"
    );
    return data;
  } catch (error) {
    throw new Error("Failed to fetch crypto prices");
  }
};
