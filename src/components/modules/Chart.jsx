import React, { useState } from "react";
import { convertData } from "../../helpers/convertData";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function Chart({ chart, setChart }) {
  const [type, setType] = useState("prices");
  console.log(chart);

  const typeHandler = (e) => {
    if (e.target.tagName === "BUTTON") {
      const type = e.target.innerText.toLowerCase().replace(" ", "_");
      setType(type);
    }
  };

  return (
    <div className="fixed left-0 top-0 z-20 h-screen w-screen backdrop-blur-[3px]">
      <div className="relative mx-auto mt-24 h-[80%] w-[80%] overflow-y-scroll rounded-xl border-4 bg-white/90">
        <span
          className="absolute right-0 top-0 z-20 m-4 cursor-pointer rounded-md bg-red-500 px-2  text-lg font-bold text-white"
          onClick={() => setChart(false)}
        >
          X
        </span>
        <div className="flex items-center gap-1 pl-3 pt-3">
          <img src={chart.coin.image} alt="" className="h-8 " />
          <p className="">{chart.coin.name}</p>
        </div>
        <ChartComponent data={convertData(chart, type)} type={type} />
        <div
          onClick={typeHandler}
          className=" -mt-10 flex w-[60%] gap-14 pl-16"
        >
          <button className=" rounded-lg border-2 border-blue-700 bg-white/90 px-2 py-1 text-blue-700 focus:bg-blue-600 focus:text-white">
            Prices
          </button>
          <button className="rounded-lg border-2 border-blue-700 bg-white/90 px-2 py-1 text-blue-700 focus:bg-blue-600 focus:text-white">
            Market Caps
          </button>
          <button className="rounded-lg border-2 border-blue-700 bg-white/90 px-2 py-1 text-blue-700 focus:bg-blue-600 focus:text-white">
            Total Volumes
          </button>
        </div>
        <div className=" mt-4 flex justify-around rounded-lg py-2">
          <div className="flex gap-2 ">
            <p className="font-extrabold text-blue-700">Prices:</p>
            <span className="">${chart.coin.current_price}</span>
          </div>
          <div className="flex gap-2">
            <p className="font-extrabold text-blue-700">ATH:</p>
            <span className="">${chart.coin.ath}</span>
          </div>
          <div className="flex gap-2">
            <p className="font-extrabold text-blue-700">Market Cap:</p>
            <span className="">${chart.coin.market_cap}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chart;

const ChartComponent = ({ data, type }) => {
  return (
    <div className="-mt-1 h-[80%]">
      <ResponsiveContainer className="p-5" width="100%" height="90%">
        <LineChart width={400} height={400} data={data}>
          <Line
            strokeWidth="2"
            stroke="#3874ff"
            type="monotone"
            dataKey={type}
          />
          <CartesianGrid stroke="#F1EFEF" />
          <YAxis dataKey={type} domain={("auto", "auto")} />
          <XAxis dataKey="data" hide />
          <Legend />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
