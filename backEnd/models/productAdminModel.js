import pool from "../config/pgDb.js";

// Function to insert a new product into the database table named SplendidHoodiesProducts
export const insertProduct = async (productData) => {
  const {
    name,
    category,
    description,
    price,
    stock,
    product_image,
    size_guide_image,
  } = productData;

  try {
    const result = await pool.query(
      `INSERT INTO SplendidHoodiesProducts 
       (name, category, description, price, stock, product_image, size_guide_image) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [
        name,
        category,
        description,
        price,
        stock,
        product_image,
        size_guide_image,
      ]
    );

    return result.rows[0];
  } catch (error) {
    console.error("❌ Error inserting product:", error.message);
    throw error;
  }
};

// Function to get all products from the database table named SplendidHoodiesProducts
export const getSplendidHoodiesProducts = async () => {
  try {
    const result = await pool.query(
      "SELECT * FROM SplendidHoodiesProducts ORDER BY id DESC"
    );
    return result.rows;
  } catch (error) {
    console.error("❌ Error getting products:", error.message);
    throw error;
  }
};
