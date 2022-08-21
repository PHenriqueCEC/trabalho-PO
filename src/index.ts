import express from "express";
import cors from "cors";
import optimizeRoutes from "./routes/optimize.route";

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || "2030";

app.use("/optimize", optimizeRoutes);

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});

app.listen(3000, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
