import pool from "../config/pgDb.js";
import { insertProduct } from "../models/productAdminModel.js";
import path from "path";
import fs from "fs";

// Ensure product table exists
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
        product_image TEXT NOT NULL,  
        size_guide_image TEXT NOT NULL,  
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("🛠️ Table 'SplendidHoodiesProducts' is ready.");
  } catch (error) {
    console.error("❌ Error creating table:", error.message);
    throw error;
  }
};

// Function to save uploaded images
const saveFile = (file, folder = "uploads") => {
  const uploadPath = path.join(process.cwd(), folder);
  if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });

  const fileName = `${Date.now()}_${file.name.replace(/\s/g, "_")}`;
  const filePath = path.join(uploadPath, fileName);

  file.mv(filePath, (err) => {
    if (err) {
      throw new Error(`Error saving file: ${err.message}`);
    }
  });

  return `/uploads/${fileName}`; // Return relative path
};

// Add Product API
export const addProduct = async (req, res) => {
  try {
    console.log("📩 Received Request Body:", req.body);
    console.log("📂 Received Files:", req.files);

    const { name, category, description, price, stock } = req.body;
    const productImage = req.files?.productImage;
    const sizeGuideImage = req.files?.sizeGuideImage;

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

    await createProductTable();

    const productExists = await pool.query(
      "SELECT id FROM SplendidHoodiesProducts WHERE name = $1",
      [name]
    );
    if (productExists.rows.length > 0) {
      return res
        .status(409)
        .json({ message: "Product name already exists. Choose another name." });
    }

    // Save images and get file paths
    const productImagePath = saveFile(productImage);
    const sizeGuideImagePath = saveFile(sizeGuideImage);

    // Insert into database
    const newProduct = await insertProduct({
      name,
      category,
      description,
      price,
      stock,
      product_image: productImagePath,
      size_guide_image: sizeGuideImagePath,
    });

    return res
      .status(201)
      .json({ message: "Product added successfully!", product: newProduct });
  } catch (error) {
    console.error("❌ Error adding product:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
