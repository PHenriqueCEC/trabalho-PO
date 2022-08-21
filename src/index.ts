import express from "express";
import cors from "cors";
import optimizeRoutes from "./routes/optimize.route";
import ProcessCsv from "./services/ProcessCsv";

const app = express();

app.use(cors());
app.use(express.json());

const processCsvService = new ProcessCsv();

processCsvService.execute();

const port = process.env.PORT || 3000;

app.use("/optimize", optimizeRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
