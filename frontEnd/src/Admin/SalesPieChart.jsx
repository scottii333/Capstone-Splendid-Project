import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";

// Register Chart.js components
ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

export const SalesBarChart = () => {
  const data = {
    labels: ["Completed Sales", "Refunds"],
    datasets: [
      {
        label: "Total Sales",
        data: [8500, 1500], // Example sales data
        backgroundColor: ["#4CAF50", "#FF5722"], // Green for sales, orange for refund
        borderColor: ["#2E7D32", "#D84315"],
        borderWidth: 2,
        hoverBackgroundColor: ["#45A049", "#E64A19"], // Darker color on hover
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Ensures chart adapts to its container
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          boxWidth: 20,
          padding: 15,
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `${
              tooltipItem.label
            }: ${tooltipItem.raw.toLocaleString()} Sales`; // Formats number with commas
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Sales Count",
          font: {
            size: 14,
          },
        },
        ticks: {
          stepSize: 2000, // Adjusts steps for better readability
          callback: (value) => value.toLocaleString(), // Formats numbers with commas
        },
      },
    },
  };

  return (
    <div className="w-full h-[18rem] sm:h-[20rem] p-4 bg-white shadow-lg rounded-lg">
      <Bar data={data} options={options} />
    </div>
  );
};
