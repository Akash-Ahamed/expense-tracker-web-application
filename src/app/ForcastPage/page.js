"use client";
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register required components
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const PredictComponent = () => {
  const [predictions, setPredictions] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [chartOptions, setChartOptions] = useState(null);

  const handlePredict = async () => {
    try {
      // Generate diverse dummy data
      const testInput = Array.from({ length: 100 }, (_, i) => ({
        lag_1: 150 + i + Math.random() * 10, // Adds variability
        lag_2: 120 + i + Math.random() * 10,
      }));

      // Simulating an API call (replace with your actual API function)
      const result = testInput
        .slice(0, 7)
        .map((data) => data.lag_1 + Math.random() * 20);
      console.log("Predictions from backend:", result);

      // Update predictions and chart
      setPredictions(result);

      // Generate chart labels (dates)
      const currentDate = new Date();
      const labels = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(currentDate);
        date.setDate(date.getDate() + i);
        return `${date.toLocaleDateString("en-US", {
          weekday: "short",
        })} ${date.getDate()}/${date.getMonth() + 1}`;
      });

      // Calculate min and max for Y-axis
      const minValue = Math.min(...result);
      const maxValue = Math.max(...result);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: "Forecasted Expenses",
            data: result,
            backgroundColor: [
              "rgba(54, 162, 235, 0.6)", // Blue
              "rgba(75, 192, 192, 0.6)", // Green
              "rgba(54, 162, 235, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(54, 162, 235, 0.6)",
            ],
            borderColor: "rgba(0, 0, 0, 0.1)",
            borderWidth: 1,
          },
        ],
      });

      setChartOptions({
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: "Forecasted expenses for the next 7 days",
          },
        },
        scales: {
          y: {
            beginAtZero: false, // Allow dynamic range
            min: minValue - 10, // Add padding below
            max: maxValue + 10, // Add padding above
            title: {
              display: true,
              text: "Expenses (Tk)",
            },
          },
        },
      });
    } catch (error) {
      console.error("Error fetching predictions:", error);
    }
  };

  return (
    <div>
      <h1>Forecasted Expenses for the Next 7 Days</h1>
      <button onClick={handlePredict}>Get Predictions</button>
      <div>
        {chartData && chartOptions && (
          <Bar data={chartData} options={chartOptions} />
        )}
      </div>
    </div>
  );
};

export default PredictComponent;
