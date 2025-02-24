import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register the components with Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

export const SalesPieChart = () => {
  const data = {
    labels: ["Completed", "Refund"],
    datasets: [
      {
        label: "Total Sales",
        data: [85, 15], // Example data: 85% completed, 15% refund
        backgroundColor: ["#4CAF50", "#FF5722"], // Green for completed, orange for refund
        borderColor: ["#ffffff", "#ffffff"],
        borderWidth: 3,
        hoverOffset: 10, // Enlarges slice on hover
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows the chart to fill the container
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
            return `${tooltipItem.label}: ${tooltipItem.raw}%`; // Shows percentage
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-[15rem]">
      {" "}
      {/* Ensures responsiveness within container */}
      <Pie data={data} options={options} />
    </div>
  );
};
