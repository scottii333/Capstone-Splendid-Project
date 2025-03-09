import express from "express";
import adminAuthRoutes from "./routes/authRoutesAdmin.js";
import newProductRoutes from "./routes/newProductRoutesAdmin.js";
import publishProductRoutes from "./routes/publishedProductRoutes.js";
import cors from "cors";
import fileUpload from "express-fileupload";
import path from "path";
import fs from "fs";

const app = express();

// Ensure uploads directory exists
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max file size
    useTempFiles: true,
    tempFileDir: "/tmp/",
    abortOnLimit: true,
    safeFileNames: true,
    preserveExtension: true,
  })
);
app.use("/uploads", express.static(uploadDir)); // Serve images

// Routes
app.use("/api/admin", adminAuthRoutes);
app.use("/api/newProduct", newProductRoutes);
app.use("/api/publishedProduct", publishProductRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
