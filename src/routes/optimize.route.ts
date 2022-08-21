import { Request, Response, Router } from "express";
import Solver from "../services/LinearSolver";

const router = Router();

router.post("/solve", async (req: Request, res: Response) => {
  try {
    const solver = new Solver();
    const result = solver.execute();

    return res.status(200).json(result);
  } catch (err) {}
});

export default router;
