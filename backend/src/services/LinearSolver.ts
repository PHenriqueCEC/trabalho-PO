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
    const res = this.glpk.solve(problem);

    console.log(res);

    // const res = this.glpk.solve(
    //   {
    //     name: "Minimização teste",
    //     objective: {
    //       direction: this.glpk.GLP_MIN,
    //       name: "obj",
    //       vars: [
    //         { name: "x1", coef: 0.8 },
    //         { name: "x2", coef: 0.6 },
    //       ],
    //     },
    //     subjectTo: [
    //       {
    //         name: "restricao 1",
    //         vars: [
    //           { name: "x1", coef: 0.2 },
    //           { name: "x2", coef: 0.32 },
    //         ],
    //         bnds: { type: this.glpk.GLP_FX, ub: 0.25, lb: 0.25 },
    //       },
    //       {
    //         name: "restricao 2",
    //         vars: [
    //           { name: "x1", coef: 1 },
    //           { name: "x2", coef: 1 },
    //         ],
    //         bnds: { type: this.glpk.GLP_FX, ub: 0, lb: 1 },
    //       },
    //     ],
    //   },
    //   this.options
    // );

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
