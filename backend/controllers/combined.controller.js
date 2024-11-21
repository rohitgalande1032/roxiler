import { SeedDatabase, listTransactions, getStatistics, getBarChart, getPieChart } from './transaction.controller.js'; // Import existing APIs

export const getCombinedData = async (req, res) => {
  try {
    const { month } = req.query; // Optional query parameter to filter by month

    // Ensure the month is valid
    if (!month || isNaN(month) || month < 1 || month > 12) {
      return res.status(400).json({ message: "Invalid or missing month parameter" });
    }

    // Fetch data for the list of transactions
    const transactionsResponse = await listTransactions(req, res);
    if (!transactionsResponse) {
      return res.status(500).json({ message: "Failed to fetch transactions" });
    }
    
    // Fetch statistics for the month
    const statisticsResponse = await getStatistics(req, res);
    if (!statisticsResponse) {
      return res.status(500).json({ message: "Failed to fetch statistics" });
    }

    // Fetch bar chart data for the month
    const barChartResponse = await getBarChart(req, res);
    if (!barChartResponse) {
      return res.status(500).json({ message: "Failed to fetch bar chart data" });
    }

    // Fetch pie chart data for the month
    const pieChartResponse = await getPieChart(req, res);
    if (!pieChartResponse) {
      return res.status(500).json({ message: "Failed to fetch pie chart data" });
    }

    // Combine the responses into one object
    const combinedData = {
      transactions: transactionsResponse.transactions,
      statistics: statisticsResponse,
      barChartData: barChartResponse,
      pieChartData: pieChartResponse,
    };

    // Return the combined response
    res.status(200).json(combinedData);
  } catch (error) {
    console.error("Error fetching combined data:", error);
    res.status(500).json({ message: "Failed to fetch combined data", error });
  }
};
