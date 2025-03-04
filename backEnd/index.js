// index.js

import express from "express";
import adminAuthRoutes from "./routes/authRoutesAdmin.js";
import newProductRoutes from "./routes/newProductRoutesAdmin.js";
import cors from "cors";
import fileUpload from "express-fileupload";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles: true,
    tempFileDir: "/tmp/",
    abortOnLimit: true,
  })
);

app.use("/api/admin", adminAuthRoutes);
app.use("/api/newProduct", newProductRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
