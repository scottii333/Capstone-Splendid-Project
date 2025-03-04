import pool from "../config/pgDb.js";
import { insertProduct } from "../models/productAdminModel.js";

// Create table if it doesn’t exist
const createProductTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS SplendidHoodiesProducts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        category VARCHAR(50) NOT NULL,
        description TEXT NOT NULL,
        price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
        stock INT NOT NULL CHECK (stock >= 0),
        product_image BYTEA NOT NULL,  -- Store image as binary
        size_guide_image BYTEA NOT NULL,  -- Store image as binary
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("🛠️ Table 'SplendidHoodiesProducts' is ready.");
  } catch (error) {
    console.error("❌ Error creating table:", error.message);
    throw error;
  }
};

// Add Product API
export const addProduct = async (req, res) => {
  try {
    console.log("📩 Received Request Body:", req.body);
    console.log("📂 Received Files:", req.files);

    const { name, category, description, price, stock } = req.body;
    const productImage = req.files?.productImage;
    const sizeGuideImage = req.files?.sizeGuideImage;

    // Validate required fields
    if (
      !name ||
      !category ||
      !description ||
      !price ||
      !stock ||
      !productImage ||
      !sizeGuideImage
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Validate price & stock
    if (isNaN(price) || price <= 0) {
      return res
        .status(400)
        .json({ message: "Price must be a positive number." });
    }
    if (isNaN(stock) || stock < 0) {
      return res
        .status(400)
        .json({ message: "Stock must be a non-negative number." });
    }

    // Ensure table exists
    await createProductTable();

    // Check if product name already exists
    const productExists = await pool.query(
      "SELECT id FROM SplendidHoodiesProducts WHERE name = $1",
      [name]
    );
    if (productExists.rows.length > 0) {
      return res
        .status(409)
        .json({ message: "Product name already exists. Choose another name." });
    }

    // Convert images to binary (buffer)
    const productImageBuffer = productImage.data;
    const sizeGuideImageBuffer = sizeGuideImage.data;

    // Insert into Database
    const newProduct = await insertProduct({
      name,
      category,
      description,
      price,
      stock,
      product_image: productImageBuffer,
      size_guide_image: sizeGuideImageBuffer,
    });

    return res
      .status(201)
      .json({ message: "Product added successfully!", product: newProduct });
  } catch (error) {
    console.error("❌ Error adding product:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
