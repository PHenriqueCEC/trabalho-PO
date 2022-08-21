// @ts-nocheck
import GLPK, { Options, Result } from "glpk.js";
export default class Solver {
  glpk: any;
  options: Options;

  constructor() {
    this.glpk = GLPK();
    this.options = {
      msglev: this.glpk.GLP_MSG_ALL,
      presol: true,
      cb: {
        call: (progress: String) => console.log(progress),
        each: 1,
      },
    };
  }

  execute(): Result {
    const res = this.glpk.solve(
      {
        name: "LP",
        objective: {
          direction: this.glpk.GLP_MAX,
          name: "obj",
          vars: [
            { name: "x1", coef: 30 },
            { name: "x2", coef: 20 },
          ],
        },
        subjectTo: [
          {
            name: "cons1",
            vars: [
              { name: "x1", coef: 2 },
              { name: "x2", coef: 1 },
            ],
            bnds: { type: this.glpk.GLP_UP, ub: 8, lb: 0.0 },
          },
          {
            name: "cons2",
            vars: [
              { name: "x1", coef: 1 },
              { name: "x2", coef: 3 },
            ],
            bnds: { type: this.glpk.GLP_UP, ub: 8.0, lb: 0.0 },
          },
        ],
      },
      this.options
    );

    return res;
  }
}
