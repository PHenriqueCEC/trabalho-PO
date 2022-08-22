// @ts-nocheck
import GLPK, { Options, Result, LP } from "glpk.js";
import fs from "fs";
export default class Solver {
  glpk: any;
  options: Options;

  constructor() {
    this.glpk = GLPK();
  }
  execute(problem?: LP): Result {
    fs.writeFileSync("problem.json", JSON.stringify(problem, null, 2));

    const res = this.glpk.solve(problem);

    // const res = this.glpk.solve(
    //   {
    //     name: "Maximização teste",
    //     objective: {
    //       direction: this.glpk.GLP_MAX,
    //       name: "obj",
    //       vars: [
    //         { name: "x1", coef: 30 },
    //         { name: "x2", coef: 20 },
    //       ],
    //     },
    //     subjectTo: [
    //       {
    //         name: "restricao 1",
    //         vars: [
    //           { name: "x1", coef: 2 },
    //           { name: "x2", coef: 1 },
    //         ],
    //         bnds: { type: this.glpk.GLP_UP, ub: 8, lb: 0.0 },
    //       },
    //       {
    //         name: "restricao 2",
    //         vars: [
    //           { name: "x1", coef: 1 },
    //           { name: "x2", coef: 3 },
    //         ],
    //         bnds: { type: this.glpk.GLP_UP, ub: 8.0, lb: 0.0 },
    //       },
    //     ],
    //   },
    //   this.options
    // );

    return res;
  }
}
