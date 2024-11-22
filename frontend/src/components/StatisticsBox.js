import React, { useState, useEffect } from 'react';

const StatisticsBox = ({ selectedMonth }) => {
  const [statistics, setStatistics] = useState(null);

  const fetchStatistics = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/transactions/statistics?month=${selectedMonth}`
      );
      const data = await response.json();
      console.log(data)
      setStatistics(data);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, [selectedMonth]);

  if (!statistics) return <div>Loading statistics...</div>;

  return (
    <div>
      <h3>Statistics for Month: {selectedMonth}</h3>
      <p>Total Sales: {statistics.totalSale}</p>
      <p>Total Sold Items: {statistics.totalSoldItems}</p>
      <p>Total Not Sold Items: {statistics.totalNotSoldItems}</p>
    </div>
  );
};

export default StatisticsBox;
