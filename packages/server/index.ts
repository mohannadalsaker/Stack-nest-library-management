import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { config } from "./src/config/env";
import { connectDB } from "./src/config/database";
import { apiRoutes } from "./src/routes";
import { errorHandler } from "./src/middleware/errorHandler";
import path from "path";

const app = express();

// Security middleware
app.use(helmet());

app.use(compression());
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Health check
app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use("/api", apiRoutes);

// Error handling
app.use(errorHandler);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 404 handler
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
  });
});

const startServer = async () => {
  try {
    await connectDB();

    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
