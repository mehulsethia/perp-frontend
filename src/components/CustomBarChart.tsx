import { Bar } from "react-chartjs-2";
import { Box, ButtonGroup, Button, Text } from "@chakra-ui/react";
import { useState } from "react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

// Register Chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function CustomBarChart() {
  const [chartData, setChartData] = useState({
    labels: Array.from({ length: 31 }, (_, i) =>
      (i + 1).toString().padStart(2, "0")
    ), // Days of the month
    datasets: [
      {
        label: "Volume",
        data: [
          5000000, 8000000, 6000000, 10000000, 12000000, 14000000, 18000000,
          16000000, 13000000, 15000000, 11000000, 14000000, 18000000, 20000000,
          24000000, 22000000, 19000000, 21000000, 25000000, 27000000, 29000000,
          31000000, 35000000, 33000000, 30000000, 34000000, 38000000, 41000000,
          39000000, 36000000, 40000000,
        ],
        backgroundColor: "#3B82F6",
        borderRadius: 0,
        barThickness: 16,
      },
    ],
  });

  // Explicit typing for ChartOptions
  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: { color: "rgba(255, 255, 255, 0.5)" }, // X-axis labels color
        grid: { display: false }, // No grid lines on x-axis
        reverse: false, // Reverse the x-axis direction
        offset: true, // Add space between bars and edges
      },
      y: {
        position: "right", // Move the y-axis to the right
        ticks: { color: "rgba(255, 255, 255, 0.5)" }, // Y-axis labels color
      },
    },
    plugins: {
      legend: { display: false }, // Hide legend
      tooltip: {
        callbacks: {
          label: (context: any) => `$${context.raw.toLocaleString()}`, // Tooltip formatting
        },
      },
    },
  };

  return (
    <Box bg="#0B0B20"  borderRadius="3xl" w="100%" maxW={{base:"sm", md:"950px"}} className="mb-10 p-4 md:p-6">
      {/* Display the total */}

      {/* Bar Chart */}
      <Box h="400px">
        <Bar data={chartData} options={options} />
      </Box>

      {/* Buttons for filtering */}
    </Box>
  );
}
