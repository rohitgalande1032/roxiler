import Transaction from '../models/transaction.model.js'
import fetch from 'node-fetch'

export const SeedDatabase = async (req, res) => {
    try {
        const response = await fetch(process.env.THIRD_PARTY_API)
        const data = await response.json()

        //console.log(data)
        //clear existing data
        await Transaction.deleteMany({})
        console.log("Existing data cleared...")

        // add new data
        await Transaction.insertMany(data)
        console.log("Database Seeded Successfully...")

        res.status(200).json({message : "Database seeded successfully !"})
    } catch (error) {
        console.log("Error seeding database", error)
        res.status(500).json({message : "Failed to seed databse...", error})
    }
}

export const listTransactions = async (req, res) => {
    try {
      const { page = 1, perPage = 10, search = "", month } = req.query;
  
      const query = {};
  
      // month filter 
      if (month) {
        query.$expr = {
          $eq: [{ $substr: ["$dateOfSale", 5, 2] }, month],
        };
      }
  
      // search filter
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
          { price: { $regex: search, $options: "i" } },
        ];
      }
  
      // Fetch total records
      const totalRecords = await Transaction.countDocuments(query);
  
      // Fetch paginated transactions
      const transactions = await Transaction.find(query)
        .skip((page - 1) * perPage)
        .limit(perPage);
  
    
      console.log("Transactions : ", totalRecords)
      return {
        totalRecords,
        currentPage: page,
        perPage,
        transactions,
      };
    } catch (error) {
        console.error("Error listing transactions:", error);
        throw new Error("Failed to fetch transactions");
    }
};
  
export const getStatistics = async(req, res) => {
    try {
        const {month} = req.query; //get month from query parameter

        if(!month || isNaN(month) || month < 1 || month > 12){
            return res.status(400).json({message: "Invalid or missing month parameter.."})
        }

        const monthNumber = parseInt(month);

        const transactions = await Transaction.find({
            $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] }
        });

        // Calculate statistics
        let totalSaleAmount = 0.0;
        let totalSoldItems = 0;
        let totalNotSoldItems = 0;

        transactions.forEach(txn => {
            if (txn.sold) {
                totalSaleAmount += parseFloat(txn.price);
                totalSoldItems++;
            } else {
                totalNotSoldItems++;
            }
        });

        const statistics = {
            totalSaleAmount : parseFloat(totalSaleAmount.toFixed(2)),
            totalSoldItems,
            totalNotSoldItems
        }

        // res.json({
        //     "Total sale amount": parseFloat(totalSaleAmount.toFixed(2)),
        //     "Total sold items": totalSoldItems,
        //     "Total Unsold items": totalNotSoldItems
        // })
        console.log("Statistics : ", statistics)
        return statistics

        
    } catch (error) {
        console.error(error)
        throw new error("Failed to fetch statistics.")
    }
}

export const getBarChart = async (req, res) => {
    try {
        const { month } = req.query;

        if (!month || isNaN(month) || month < 1 || month > 12) {
            return res.status(400).json({ message: "Invalid or missing month parameter" });
        }

        //convert month string to number
        const monthNumber = parseInt(month);

        // Fetch all transactions for the given month
        const transactions = await Transaction.find({
            $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] }
        });

        // Define price ranges
        const priceRanges = [
            { range: "0-100", min: 0, max: 100, count: 0 },
            { range: "101-200", min: 101, max: 200, count: 0 },
            { range: "201-300", min: 201, max: 300, count: 0 },
            { range: "301-400", min: 301, max: 400, count: 0 },
            { range: "401-500", min: 401, max: 500, count: 0 },
            { range: "501-600", min: 501, max: 600, count: 0 },
            { range: "601-700", min: 601, max: 700, count: 0 },
            { range: "701-800", min: 701, max: 800, count: 0 },
            { range: "801-900", min: 801, max: 900, count: 0 },
            { range: "901+", min: 901, max: Infinity, count: 0 },
        ];

        // Calculate items in each range
        transactions.forEach(txn => {
            const price = parseFloat(txn.price);
            for (const range of priceRanges) {
                if (price >= range.min && price <= range.max) {
                    range.count++;
                    break;
                }
            }
        });

        // Format response
        const response = priceRanges.map(({ range, count }) => ({ range, count }));

        console.log("Bar chart data : ", response)
        // res.json(response);
        return response
    } catch (error) {
        console.error("Error fetching bar chart data:", error);
        throw new Error("Failed to fetch bar chart data")
    }
};


// Find unique categories from transactions of the selected month.
// Count the number of items in each category.

export const getPieChart = async (req) => {
    try {
      const { month } = req.query;
  
      // Validate month parameter
      if (!month || isNaN(month) || month < 1 || month > 12) {
        throw new Error("Invalid or missing month parameter");
      }
  
      const monthNumber = parseInt(month);
  
      // Fetch transactions for the selected month
      const transactions = await Transaction.find({
        $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] },
      });
  
      // If no transactions are found
      if (transactions.length === 0) {
        return [];
      }
  
      // Calculate unique categories and their counts
      const categoryCounts = {};
      transactions.forEach((txn) => {
        const category = txn.category || "Unknown";
        if (categoryCounts[category]) {
          categoryCounts[category] += 1;
        } else {
          categoryCounts[category] = 1;
        }
      });
  
      // Format response
      const response = Object.entries(categoryCounts).map(([category, count]) => ({
        category,
        count,
      }));
  
      console.log("Pir chart data : ", response)
      // Return the data
      return response;
    } catch (error) {
      console.error("Error fetching pie chart data:", error);
      throw new Error("Failed to fetch pie chart data");
    }
  };
  
