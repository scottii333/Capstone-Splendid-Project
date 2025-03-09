import express from "express";
import {
  publishProduct,
  fetchPublishedProducts,
} from "../controllers/publishedProductController.js";

const router = express.Router();

// Publish product endpoint
router.post("/publish", publishProduct);

// Fetch published products
router.get("/fetch", fetchPublishedProducts);

export default router;
