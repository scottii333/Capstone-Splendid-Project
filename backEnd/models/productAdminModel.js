import pool from "../config/pgDb.js";

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
