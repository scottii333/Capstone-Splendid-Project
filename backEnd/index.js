import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import path from "path";
import fs from "fs";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

// Import routes
import adminAuthRoutes from "./routes/authRoutesAdmin.js";
import newProductRoutes from "./routes/newProductRoutesAdmin.js";
import publishProductRoutes from "./routes/publishedProductRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";

const app = express();
dotenv.config();

// ✅ Fix CORS Issue (Place Before Routes)
app.use(
  cors({
    origin: "http://localhost:5173", // ✅ Allow frontend origin
    credentials: true, // ✅ Allow credentials (cookies, authorization headers)
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Enable Cookies (Place Before Routes)
app.use(cookieParser());

// ✅ Add CORS Headers Globally
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// ✅ Handle Preflight Requests
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(204);
});

// Ensure uploads directory exists
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Middleware

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
app.use("/api/customer", customerRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
