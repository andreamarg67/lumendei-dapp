"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const data = {
  labels: ["Nov", "Dec", "Jan", "Feb", "Mar"],
  datasets: [
    {
      label: "Monthly Profit (%)",
      data: [2, 4, 6.5, 9, 10], // Mocked growth data
      borderColor: "#fee4a3",
      backgroundColor: "#fee4a350",
      tension: 0.4,
      fill: true,
    },
  ],
};

const options = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        color: "#fff",
      },
    },
    x: {
      ticks: {
        color: "#fff",
      },
    },
  },
  plugins: {
    legend: {
      labels: {
        color: "#fff",
      },
    },
  },
};

export default function PerformanceChart() {
  return <Line data={data} options={options} />;
}
