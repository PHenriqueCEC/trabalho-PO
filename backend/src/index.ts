import express from "express";
import cors from "cors";
import optimizeRoutes from "./routes/optimize.route";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 2520;

app.use("/optimize", optimizeRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
