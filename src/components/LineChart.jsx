import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useRef } from "react";
import { Line } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
);

const LineChart = ({ data, labels }) => {
  const chartRef = useRef(null); //ref containing the chart instance

  const chartData = {
    labels,
    datasets: [
      {
        label: "Feature Trend",
        data,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.3,
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      zoom: {
        pan: {
          enabled: true,
          mode: "x",
        },
        zoom: {
          wheel: {
            enabled: true,
            speed: 0.1,
          },
          pinch: {
            enabled: true,
          },
          mode: "x",
        },
      },
    },
    scales: {
      x: {
        type: "category",
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Value",
        },
      },
    },
  };

  const handleResetZoom = () => {
    if (chartRef.current) {
      chartRef.current.resetZoom();
    }
  };

  const handleZoomIn = () => {
    if (chartRef.current) {
      chartRef.current.zoom(1.1);
    }
  };

  const handleZoomOut = () => {
    if (chartRef.current) {
      chartRef.current.zoom(0.9);
    }
  };

  return (
    <section
      aria-labelledby="line-chart-title"
      className="relative w-full max-w-2xl mx-auto h-64 md:h-80"
    >
      <h2 id="line-chart-title" className="sr-only">
        Line Chart for Feature Trend over Time
      </h2>

      <figure className="h-64 md:h-80">
        <Line ref={chartRef} data={chartData} options={options} />
        <figcaption className="sr-only">
          Line chart showing the trend of a feature over time. The x-axis
          represents the date, and the y-axis represents the value.
        </figcaption>
      </figure>

      <div
        className="absolute top-2 right-2 flex space-x-1"
        role="group"
        aria-labelledby="zoom-controls"
      >
        <button
          onClick={handleResetZoom}
          className="bg-white text-blue-500 px-1.5 py-0.5 text-sm rounded-md hover:bg-blue-500 hover:text-white border-[3px] border-blue-500"
          aria-label="Reset Zoom"
        >
          Reset
        </button>

        <button
          onClick={handleZoomIn}
          className="bg-white border-[3px] border-green-500 text-green-500 px-1.5 py-0.5 text-sm rounded-md hover:bg-green-600 hover:text-white font-extrabold"
          aria-label="Zoom In"
        >
          +
        </button>

        <button
          onClick={handleZoomOut}
          className="bg-white text-red-500 font-extrabold border-[3px] border-red-500 px-1.5 py-0.5 text-sm rounded-md hover:bg-red-500 hover:text-white"
          aria-label="Zoom Out"
        >
          -
        </button>
      </div>
    </section>
  );
};

export default LineChart;
