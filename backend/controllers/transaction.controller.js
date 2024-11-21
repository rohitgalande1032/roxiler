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
  
      res.status(200).json({
        totalRecords,
        currentPage: page,
        perPage,
        transactions,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch transactions",
        error: error.message,
      });
    }
  };
  