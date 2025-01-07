"use client";
import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function ExpensePieChart() {
  const [expenses, setExpenses] = useState([]);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [chartData, setChartData] = useState([]);
  const [showChart, setShowChart] = useState(false);

  const fetchExpenses = async () => {
    if (dateRange.start && dateRange.end) {
      const res = await fetch(
        `/api/expensePieChart?start=${dateRange.start}&end=${dateRange.end}`
      );
      const data = await res.json();
      setExpenses(data.expenses);
      generateChartData(data.expenses);
      setShowChart(true); // Display the chart after fetching the data
    } else {
      alert("Please select both start and end dates.");
    }
  };

  const generateChartData = (expenses) => {
    const categoryData = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});

    const formattedData = Object.keys(categoryData).map((key) => ({
      name: key,
      value: categoryData[key],
    }));

    setChartData(formattedData);
  };

  const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];
  return (
    <div>
      <h1>Expense Report</h1>
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ marginRight: "1rem" }}>
          From:
          <input
            type="date"
            onChange={(e) =>
              setDateRange({ ...dateRange, start: e.target.value })
            }
          />
        </label>
        <label style={{ marginRight: "1rem" }}>
          TO:
          <input
            type="date"
            onChange={(e) =>
              setDateRange({ ...dateRange, end: e.target.value })
            }
          />
        </label>
        <button
          className="bg-green-500"
          onClick={fetchExpenses}
          style={{ padding: "0.5rem 1rem", cursor: "pointer" }}
        >
          Generate Report
        </button>
      </div>
      {showChart && chartData.length > 0 ? (
        <PieChart width={400} height={400}>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      ) : showChart && chartData.length === 0 ? (
        <p>No expenses found for the selected date range.</p>
      ) : null}
    </div>
  );
}
