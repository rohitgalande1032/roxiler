import express from 'express';
import { getBarChart, getPieChart, getStatistics, listTransactions, SeedDatabase } from '../controllers/transaction.controller.js';
import { getCombinedData } from '../controllers/combined.controller.js';

const router = express.Router()

// Seed database route
router.get("/seed", SeedDatabase)

router.get("/", listTransactions)

router.get("/statistics", getStatistics)

router.get("/bar-chart", getBarChart)

router.get("/pie-chart", getPieChart)

router.get("/combined-data", getCombinedData)

export default router;