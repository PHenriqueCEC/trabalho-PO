import express from "express";
import cors from "cors";
import optimizeRoutes from "./routes/optimize.route";
import ProcessCsv from "./services/ProcessCsv";
import LinearSolver from "./services/LinearSolver";
import CreateLinearProblem from "./services/CreateLinearProblem";

const app = express();

app.use(cors());
app.use(express.json());

const processCsvService = new ProcessCsv();
const linearSolver = new LinearSolver();
const createLinearProblem = new CreateLinearProblem();

// linearSolver.execute();
const { materialsData, restrictions } = processCsvService.execute();
const problem = createLinearProblem.execute(
  materialsData,
  restrictions,
  "Otimização teste"
);
linearSolver.execute(problem);

const port = process.env.PORT || 3000;

app.use("/optimize", optimizeRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
