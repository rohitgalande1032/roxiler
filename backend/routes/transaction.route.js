import express from 'express';
import { getBarChart, getStatistics, listTransactions, SeedDatabase } from '../controllers/transaction.controller.js';

const router = express.Router()

// Seed database route
router.get("/seed", SeedDatabase)

router.get("/", listTransactions)

router.get("/statistics", getStatistics)

router.get("/bar-chart", getBarChart)

export default router;