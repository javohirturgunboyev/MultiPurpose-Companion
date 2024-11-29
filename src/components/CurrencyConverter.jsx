import React, { useEffect, useState } from "react";
import axios from "axios";

const CurrencyConverter = () => {
  const [rates, setRates] = useState({});
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [error, setError] = useState("");

  const topCurrencies = [
    "USD", "EUR", "GBP", "JPY", "AUD",
    "CAD", "CHF", "CNY", "SEK", "NZD",
    "MXN", "SGD", "HKD", "NOK", "KRW",
    "TRY", "INR", "RUB", "BRL", "ZAR"
  ];

  useEffect(() => {
    axios
      .get("https://api.exchangerate.host/latest")
      .then((res) => setRates(res.data.rates))
      .catch(() => setError("Valyutalar ma'lumotlarini olishda xatolik yuz berdi"));
  }, []);

  const handleConvert = () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      setError("To'g'ri miqdor kiriting");
      setConvertedAmount(null);
      return;
    }
    if (rates[fromCurrency] && rates[toCurrency]) {
      const result = (amount * rates[toCurrency]) / rates[fromCurrency];
      setConvertedAmount(result.toFixed(2));
      setError("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-300 to-blue-600">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-2xl font-bold text-center mb-4 text-blue-600">Currency Converter</h1>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="flex gap-4 mb-4">
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="w-1/2 p-3 border rounded-lg"
          >
            {topCurrencies.map((currency) => (
              <option key={currency} value={currency}>{currency}</option>
            ))}
          </select>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="w-1/2 p-3 border rounded-lg"
          >
            {topCurrencies.map((currency) => (
              <option key={currency} value={currency}>{currency}</option>
            ))}
          </select>
        </div>
        <button
          onClick={handleConvert}
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
        >
          Convert
        </button>
        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
        {convertedAmount && (
          <p className="mt-4 text-center text-lg font-semibold text-blue-600">
            {amount} {fromCurrency} = {convertedAmount} {toCurrency}
          </p>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;
