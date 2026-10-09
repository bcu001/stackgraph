import express, { Request, Response } from "express";
import cors from 'cors'
import morgan from 'morgan'

const app = express();
app.use(express.json());
app.use(cors())
app.use(morgan("dev"))

app.get("/api/health", (req: Request, res: Response) => {
  res.json({status: "ok"});
});

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Backend of stackGraph" });
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
