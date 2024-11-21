import { SeedDatabase, listTransactions, getStatistics, getBarChart, getPieChart } from './transaction.controller.js'; // Import the necessary functions

export const getCombinedData = async (req, res) => {
    try {
      const { month, page = 1, perPage = 10, search = "" } = req.query;
  
      if (!month || isNaN(month) || month < 1 || month > 12) {
        return res.status(400).json({ message: "Invalid or missing month parameter" });
      }
  
      const monthNumber = parseInt(month);
  
      // Fetch data from all endpoints
      const [statistics, transactions, barChartData, pieChartData] = await Promise.all([
        getStatistics({ query: { month: monthNumber } }),
        listTransactions({ query: { page, perPage, search, month } }),
        getBarChart({ query: { month: monthNumber } }),
        getPieChart({ query: { month: monthNumber } }),
      ]);
  
      // Combine results
      const combinedData = {
        statistics: statistics || {},
        transactions: transactions || {},
        barChart: barChartData || [],
        pieChart: pieChartData || [],
      };
  
      res.status(200).json(combinedData);
    } catch (error) {
      console.error("Error fetching combined data:", error.message);
      res.status(500).json({ message: "Error fetching combined data", error: error.message });
    }
  };