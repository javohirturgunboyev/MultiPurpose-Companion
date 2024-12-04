import axios from "axios";
import React, { useEffect, useState } from "react";

function CurrencyConverter() {
  const [field, setField] = useState(null);
  const [rate, setRate] = useState(null);
  const [result, setResult] = useState(0);

  useEffect(() => {
    axios
      .get(
        `https://api.fastforex.io/fetch-one?from=USD&to=EUR&api_key=${import.meta.env.VITE_API_KEY}`
      )
      .then((response) => {
        if (response.status == 200) {
          setRate(response.data.result.EUR);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleConverter(event) {
    event.preventDefault();
    setResult((field * rate).toFixed(2));
  }
  return (
    <div>
      <div className="w-[400px] border items-center ml-auto mr-auto mb-10">
        <input
          value={field}
          onChange={(event) => {
            setField(event.target.value);
          }}
          className="w-full border p-[12px]"
          type="number"
          placeholder="Enter usd....."
        />
        <button className="w-full bg-blue-500 p-[12px] text-white" onClick={handleConverter}>Converter</button>
        <h3 className="w-full bg-green-500 p-[12px] text-white">{result}</h3>
      </div>
    </div>
  );
}

export default CurrencyConverter;
