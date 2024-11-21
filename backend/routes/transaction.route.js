import express from 'express';
import { getStatistics, listTransactions, SeedDatabase } from '../controllers/transaction.controller.js';

const router = express.Router()

// Seed database route
router.get("/seed", SeedDatabase)

router.get("/", listTransactions)

router.get("/statistics", getStatistics)

export default router;