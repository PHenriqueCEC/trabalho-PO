// @ts-nocheck
import GLPK, { Options, Result, LP } from "glpk.js";
import { GLPK_RESULT_TYPE } from "../constants/glpk";
export default class Solver {
  glpk: any;
  options: Options;

  constructor() {
    this.glpk = GLPK();
  }

  execute(problem?: LP): Result {
    const res: Result = this.glpk.solve(problem);

    if (res.result.status === GLPK_RESULT_TYPE.GLP_NOFEAS)
      throw new Error("Não existe solução viável para o problema");

    return res;
  }
}
