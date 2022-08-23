import { Request, Response, Router } from "express";
import multer from "multer";
import Solver from "../services/LinearSolver";

const upload = multer();
const router = Router();

router.post(
  "/solve",
  upload.single("data"),
  async (req: Request, res: Response) => {
    try {
      console.log(req.file);

      // const solver = new Solver();
      // const result = solver.execute();

      return res.status(200).json({});
    } catch (err) {
      return res.status(500);
    }
  }
);

export default router;
