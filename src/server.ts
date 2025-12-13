import express, { Request, Response } from "express";
import config from "./config";
import initDB from "./config/db";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/user/user.routes";
import { todoRoutes } from "./modules/todo/todo.routes";
import { authRoutes } from "./modules/auth/auth.routes";

const app = express();
const port = config.port;

// parser
app.use(express.json());

const startServer = async () => {
  try {
    // ✅ wait for DB initialization
    await initDB();
    console.log("Database initialized successfully");

    app.get("/", logger, (req: Request, res: Response) => {
      res.send("Hello Next Level Developers!");
    });

    // routes
    app.use("/users", userRoutes);
    app.use("/todos", todoRoutes);
    //auth route
    app.use("/auth", authRoutes);


    app.use((req, res) => {
      res.status(404).json({
        success: false,
        message: "Route not found",
        path: req.path,
      });
    });

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
