import Transaction from '../models/transaction.model.js'
import fetch from 'node-fetch'

export const SeedDatabase = async (req, res) => {
    try {
        const response = await fetch(process.env.THIRD_PARTY_API)
        const data = await response.json()

        console.log(data)
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