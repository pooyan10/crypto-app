import React from "react";

function Chart({ chart, setChart }) {
  return (
    <div className="fixed left-0 top-0 z-20 h-screen w-screen backdrop-blur-[3px]">
      <span
        className="m-4 inline-block  cursor-pointer rounded-md bg-red-500 px-3 py-1 text-xl font-extrabold text-white"
        onClick={() => setChart(false)}
      >
        X
      </span>
      <div className="mx-auto mt-20 h-[400px] w-[800px] rounded-xl  border-4 bg-white/80"></div>
    </div>
  );
}

export default Chart;
