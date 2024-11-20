import express from 'express';
import { SeedDatabase } from '../controllers/transaction.controller.js';

const router = express.Router()

// Seed database route
router.get("/seed", SeedDatabase)

export default router;