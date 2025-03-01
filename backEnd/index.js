// app.js

import express from "express";

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Use Routes

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
