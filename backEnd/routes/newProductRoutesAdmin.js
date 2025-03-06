import express from "express";
import {
  addProduct,
  fetchSplendidHoodiesProducts,
} from "../controllers/productControllerAdmin.js";

const router = express.Router();

// Routes for adding new products
router.post("/add", addProduct);

// Routes for fetching all products
router.get("/fetch", fetchSplendidHoodiesProducts);

export default router;
