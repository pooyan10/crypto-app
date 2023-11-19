import chartUp from "../../assets/chart-up.svg";
import chartDown from "../../assets/chart-down.svg";
import { LineWave } from "react-loader-spinner";
import { marketChart } from "../../services/cryptoApi";

export default function TableCoin({ coins, isLoading, setChart }) {
  return (
    <div className="">
      {isLoading ? (
        <div className="flex h-screen items-center justify-center ">
          <LineWave
            height="100"
            width="100"
            color="#4fa94d"
            ariaLabel="line-wave"
            visible={true}
          />
        </div>
      ) : (
        <table className="mt-6 w-full">
          <thead className="">
            <tr className="border-b-4 ">
              <th className="py-2 text-start">coin</th>
              <th className="text-start">name</th>
              <th className="text-start">price</th>
              <th className="text-start">24h</th>
              <th className="text-start">total value</th>
              <th className="text-start"></th>
            </tr>
          </thead>
          <tbody className="">
            {coins.map((coin) => (
              <TableRow key={coin.id} coin={coin} setChart={setChart} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const TableRow = ({
  coin: {
    id,
    image,
    symbol,
    name,
    current_price,
    price_change_percentage_24h: price_change,
    total_volume,
  },
  setChart,
}) => {
  const showHandler = async () => {
    try {
      const res = await fetch(marketChart(id));
      const data = await res.json();
      setChart(data);
      console.log(data);
    } catch (error) {
      console.log(error);
      setChart(null);
    }
  };

  return (
    <tr className="border-b">
      <td className="py-5">
        <div
          className="flex cursor-pointer flex-wrap items-center gap-2 overflow-x-scroll"
          onClick={showHandler}
        >
          <img className="h-10" src={image} alt="" />
          <span>{symbol.toUpperCase()}</span>
        </div>
      </td>
      <td className="py-5">{name}</td>
      <td className="py-5">{current_price.toLocaleString()}</td>
      <td className="py-5">{price_change.toFixed(2)}%</td>
      <td className="py-5">{total_volume.toLocaleString()}</td>

      <td className="-mr-8 flex w-fit items-center py-5">
        <img src={price_change > 0 ? chartUp : chartDown} alt={name} />
      </td>
    </tr>
  );
};
