import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import blogRouter from "routes/blogRouter";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/blog", blogRouter);

app.get("/api/ping", (_req: Request, res: Response) => {
  res.status(200).send("pong");
});

app.use((_req: Request, res: Response) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || "Server error";
  res.status(status).json({ message });
});

export default app;
