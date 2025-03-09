import pool from "../config/pgDb.js";

// Ensure published table exists
// Ensure the published table exists before inserting data
const createPublishedTableIfNotExists = async () => {
  try {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS SplendidHoodiesPublishProduct (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          category VARCHAR(50) NOT NULL,
          description TEXT NOT NULL,
          price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
          stock INT NOT NULL CHECK (stock >= 0),
          product_image TEXT NOT NULL,
          size_guide_image TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
    console.log("✅ Table 'SplendidHoodiesPublishProduct' is ready.");
  } catch (error) {
    console.error("❌ Error creating table:", error.message);
    throw error;
  }
};

// Publish Product Logic - Create table if missing and insert data
export const publishProduct = async (req, res) => {
  try {
    console.log("📥 Received data from frontend:", req.body);

    const {
      name,
      category,
      description,
      price,
      stock,
      product_image,
      size_guide_image,
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !category ||
      !description ||
      !price ||
      !stock ||
      !product_image ||
      !size_guide_image
    ) {
      return res.status(400).json({ message: "⚠️ All fields are required!" });
    }

    // Ensure table exists before inserting data
    await createPublishedTableIfNotExists();

    // Insert product into the table
    const result = await pool.query(
      `INSERT INTO SplendidHoodiesPublishProduct (name, category, description, price, stock, product_image, size_guide_image) 
           VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [
        name,
        category,
        description,
        parseFloat(price),
        parseInt(stock),
        product_image,
        size_guide_image,
      ]
    );

    console.log("✅ Product published successfully:", result.rows[0]);

    return res.status(201).json({
      message: "Product published successfully!",
      product: result.rows[0],
    });
  } catch (error) {
    console.error("❌ Error publishing product:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Fetch Published Products
export const fetchPublishedProducts = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM SplendidHoodiesPublishProduct ORDER BY id DESC`
    );

    console.log("📥 Fetching Published Products:", result.rows);

    if (result.rows.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
        message: "No published products found.",
      });
    }

    return res.status(200).json({ success: true, data: result.rows });
  } catch (error) {
    console.error("❌ Error fetching published products:", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
};
