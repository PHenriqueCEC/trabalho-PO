import express from "express";
import cors from "cors";
import optimizeRoutes from "./routes/optimize.route";
import Solver from "./services/LinearSolver";

const app = express();
app.use(cors);

const port = process.env.PORT || "2030";

const solver = new Solver();

const res = solver.execute();

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});

app.use("/optimize", optimizeRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
