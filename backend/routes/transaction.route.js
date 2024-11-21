import express from 'express';
import { listTransactions, SeedDatabase } from '../controllers/transaction.controller.js';

const router = express.Router()

// Seed database route
router.get("/seed", SeedDatabase)

router.get("/", listTransactions)

export default router;