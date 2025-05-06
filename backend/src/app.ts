import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import blogRouter from "routes/blogRouter";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/blog", blogRouter);

app.use((_: Request, res: Response) => {
  res.status(404).json({ message: "Not found" });
});

// @ts-ignore
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || "Server error";
  res.status(status).json({ message });
});

export default app;
