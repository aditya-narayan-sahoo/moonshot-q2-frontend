import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ data, onBarClick }) => {
  const chartData = {
    labels: ["A", "B", "C", "D", "E", "F"],
    datasets: [
      {
        label: "Total Time Spent",
        data: data,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Total Time Spent on Features",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const feature = chartData.labels[index];
        onBarClick(feature);
      }
    },
  };

  return (
    <section
      aria-labelledby="bar-chart-title"
      className="w-full max-w-2xl mx-auto"
    >
      <h2 id="bar-chart-title" className="sr-only">
        Bar Chart for Total Time Spent on Features
      </h2>
      <figure>
        <Bar data={chartData} options={options} />
        <figcaption className="sr-only">
          Bar chart showing the total time spent on various features. Each bar
          represents a feature (A to F).
        </figcaption>
      </figure>
    </section>
  );
};

export default BarChart;
