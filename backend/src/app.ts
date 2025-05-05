import express from "express";
import cors from "cors";
import "dotenv/config";
import blogRouter from "routes/blogRouter";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/blog", blogRouter);

app.use((req: express.Request, res: express.Response) => {
  res.status(404).json({ message: "Not found" });
});

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const status = err.status || 500;
    const message = err.message || "Server error";
    res.status(status).json({ message });
  }
);

export default app;
