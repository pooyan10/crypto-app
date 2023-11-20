import React, { useEffect, useState } from "react";
import { Input } from "@nextui-org/react";
import { searchCoin } from "../../services/cryptoApi";
import { LineWave } from "react-loader-spinner";

function SearchBox({ currency, setCurrency }) {
  const [text, setText] = useState("");
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    setCoins([]);
    if (!text) {
      setIsLoading(false);
      return;
    }

    const search = async () => {
      try {
        const res = await fetch(searchCoin(text), {
          signal: controller.signal,
        });
        const data = await res.json();
        console.log(data);

        if (data.coins) {
          setCoins(data.coins);
          setIsLoading(false);
        } else {
          alert(data.status.error_message);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.log(error.message);
        }
      }
    };
    setIsLoading(true);
    search();

    return () => controller.abort();
  }, [text]);

  return (
    <>
      <div className="mt-5 flex items-center">
        <Input
          className="w-[30%] p-4"
          type="text"
          label="Search"
          labelPlacement="outside"
          onChange={(e) => setText(e.target.value)}
        />
        <select
          className="mt-6 cursor-pointer rounded-lg border-2 p-2 hover:bg-gray-100 "
          onChange={(e) => setCurrency(e.target.value)}
          value={currency}
        >
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="jpy">JPY</option>
        </select>
      </div>
      {(!!coins.length || isLoading) && (
        <div className=" absolute ml-4 min-w-[300px] rounded-md  border-2 bg-white sm:w-[30%]">
          <div className="inline-block h-10 w-full bg-gradient-to-b from-gray-100"></div>
          {isLoading ? (
            <div className="mb-4 ml-5 flex items-center justify-center">
              <LineWave />
            </div>
          ) : (
            <ul className="-mt-7 h-[300px] overflow-y-auto p-2">
              {coins.map((coin) => (
                <li
                  className="flex items-center gap-2 border-b p-2"
                  key={coin.id}
                >
                  <img src={coin.thumb} alt={coin.name} />
                  <p className="">{coin.name}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
}

export default SearchBox;
