import React, { useEffect } from "react";

function HomePage() {
  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&x_cg_demo_api_key=CG-SrXjpgYTGGhXPdgzc3RRUUwp"
    )
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  return <div>HomePage</div>;
}

export default HomePage;
