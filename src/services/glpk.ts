import GLPK from "glpk.js";

const glpk = GLPK();
const options = {
  msglev: glpk.GLP_MSG_ALL,
  presol: true,
  cb: {
    call: (progress : String) => console.log(progress),
    each: 1,
  },
};
const res = glpk.solve(
  {
    name: "LP",
    objective: {
      direction: glpk.GLP_MAX,
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
        bnds: { type: glpk.GLP_UP, ub: 8, lb: 0.0 },
      },
      {
        name: "cons2",
        vars: [
          { name: "x1", coef: 1 },
          { name: "x2", coef: 3 },
        ],
        bnds: { type: glpk.GLP_UP, ub: 8.0, lb: 0.0 },
      },
    ],
  },
  options
);

console.log(res);
