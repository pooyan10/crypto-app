import React, { useEffect, useState } from "react";
import TableCoin from "../modules/TableCoin";
import { getCoinList } from "../../services/cryptoApi";
import Paginations from "../modules/Pagination";
import SearchBox from "../modules/SearchBox";
import Chart from "../modules/Chart";
import NavBar from "../modules/NavBar";
import { useRef } from "react";

function HomePage() {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [currency, setCurrency] = useState("usd");
  const [chart, setChart] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      try {
        const res = await fetch(getCoinList(currentPage, currency));
        const data = await res.json();
        setCoins(data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [currentPage, currency]);

  const ref = useRef(null);
  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={ref} className="px-4">
      <NavBar />
      <SearchBox currency={currency} setCurrency={setCurrency} />
      <TableCoin coins={coins} isLoading={isLoading} setChart={setChart} />
      <Paginations
        handleClick={handleClick}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      {!!chart && <Chart chart={chart} setChart={setChart} />}
    </div>
  );
}

export default HomePage;
