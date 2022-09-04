export const fetchLatestExchangeRates = async () => {
  const response = await fetch(
    `http://api.currencylayer.com/live?access_key=${process.env.REACT_APP_API_KEY}`
  );

  return response.json();
};
