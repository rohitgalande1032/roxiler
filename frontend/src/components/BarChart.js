import React, { useEffect, useState } from 'react';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register necessary components
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChartComponent = ({ selectedMonth }) => {
  const [chartData, setChartData] = useState(null);

  const fetchBarChartData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/transactions/bar-chart?month=${selectedMonth}`
      );
      const data = await response.json();

      const labels = data.map((item) => item.range);
      const values = data.map((item) => item.count);

      setChartData({
        labels,
        datasets: [
          {
            label: "Number of Items",
            data: values,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching bar chart data:", error);
    }
  };

  useEffect(() => {
    fetchBarChartData();
  }, [selectedMonth]);

  if (!chartData) return <div>Loading chart...</div>;

  return <Bar data={chartData} />;
};

export default BarChartComponent;
