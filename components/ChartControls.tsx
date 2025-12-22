import { FaChartColumn, FaChartLine } from "react-icons/fa6";
import { Button } from "./Button";
import { TTimeframe } from "@/types/timeframe";
import { TCurrency } from "@/types/currency";

type ChartControlsProps = {
  timeframe: TTimeframe;
  onTimeframeChange: (t: TTimeframe) => void;

  currency: TCurrency;
  onCurrencyChange: (c: TCurrency) => void;

  chartView: "line" | "candle";
  onChartViewChange: (v: "line" | "candle") => void;
};

const ChartControls = (props: ChartControlsProps) => {
  const {
    timeframe,
    onTimeframeChange,
    currency,
    onCurrencyChange,
    chartView,
    onChartViewChange,
  } = props;
  return (
    <div className="md:flex md:justify-between md:flex-row-reverse space-y-1 md:space-y-0">
      <div className="p-1  flex space-x-2 rounded-lg bg-gray-700/30 h-fit text-gray-300/90 w-fit font-semibold">
        <Button onClick={() => onTimeframeChange("1h")} active={timeframe === "1h"}>
          1H
        </Button>
        <Button onClick={() => onTimeframeChange("1d")} active={timeframe === "1d"}>
          1D
        </Button>
        <Button onClick={() => onTimeframeChange("1w")} active={timeframe === "1w"}>
          1W
        </Button>
        {/*<Button>3M</Button>*/}
      </div>

      <div className="flex md:flex-col space-y-1 space-x-1">
        <div className="p-1 flex space-x-2 rounded-lg bg-gray-700/30 text-gray-300/90 w-fit h-fit font-semibold">
          <Button
            onClick={() => onCurrencyChange("USD")}
            active={currency === "USD"}
          >
            USD
          </Button>
          <Button
            onClick={() => onCurrencyChange("IDR")}
            active={currency === "IDR"}
          >
            IDR
          </Button>
        </div>
        <div className="p-1 flex space-x-2 rounded-lg bg-gray-700/30 text-gray-300/90 w-fit h-full font-semibold">
          <Button
            onClick={() => onChartViewChange("line")}
            active={chartView === "line"}
          >
            <FaChartLine />
          </Button>
          <Button
            onClick={() => onChartViewChange("candle")}
            active={chartView === "candle"}
          >
            <FaChartColumn />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChartControls;
