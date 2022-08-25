//@ts-nocheck
import { Request, Response, Router } from "express";
import multer from "multer";
import xlsx from "xlsx";
import ProcessCsv from "../services/ProcessCsv";
import CreateLinearProblem from "../services/CreateLinearProblem";
import Solver from "../services/LinearSolver";
import jsonToSheetBuffer from "../utils/jsonToSheetBuffer";
import glpkResultToParsedJson from "../utils/glpkResultToParsedJson";

const upload = multer();
const router = Router();

router.post(
  "/solve",
  upload.single("data"),
  async (req: Request, res: Response) => {
    try {
      const { file } = req;
      const { problemName } = req.body;

      const processCsvInstance = new ProcessCsv();
      const { materialsData, restrictions } = processCsvInstance.execute(
        file?.buffer || Buffer.alloc(0)
      );

      const createLinearProblemInstance = new CreateLinearProblem();
      const problemParsed = createLinearProblemInstance.execute(
        materialsData,
        restrictions,
        problemName
      );

      const solverInstance = new Solver();
      const solvedProblem = solverInstance.execute(problemParsed);

      const sheet = jsonToSheetBuffer(
        glpkResultToParsedJson(solvedProblem.result.vars, materialsData)
      );

      return res.status(200).json({
        ...solvedProblem,
        materialsData,
        sheet,
      });
    } catch (err) {
      let errorMessage = "";
      if (err instanceof Error) errorMessage = err.message;

      return res.status(500).json({
        message: errorMessage,
      });
    }
  }
);

export default router;
