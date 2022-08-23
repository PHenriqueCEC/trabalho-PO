import GLPK, { LP } from "glpk.js";
import { GLPK_PROBLEM_TYPE, GLPK_BOUND_TYPES } from "../constants/glpk";
import { options } from "../utils/glpkDefaultOptions";
import { Restriction } from "../interfaces/LinearProblem";

export default class CreateLinearProblem {
  constructor() {}

  makeObjetiveFunction(problemData: Array<any>) {
    const vars = problemData.map((item: any) => {
      return {
        name: item.name,
        coef: item.Preco,
      };
    });

    return {
      direction: GLPK_PROBLEM_TYPE.GLP_MIN,
      name: "Função objetivo de minimização de preço",
      vars,
    };
  }

  makeRestrictions(problemData: Array<any>, restrictions: Array<Restriction>) {
    return restrictions.map((restriction) => {
      return {
        name: restriction.label,
        vars: problemData.map((item) => {
          return {
            name: String(item.name),
            coef: item[restriction.label],
          };
        }),
        bnds: {
          type: GLPK_BOUND_TYPES.GLP_UP,
          ub: restriction.exigences,
          lb: 0.0,
        },
      };
    });
  }

  execute(
    problemData: Array<any>,
    restrictions: Array<Restriction>,
    problemName: string
  ): LP {
    const objetiveFunction = this.makeObjetiveFunction(problemData);

    const restriction = this.makeRestrictions(problemData, restrictions);
    restriction.push({
      name: "Sum of the materials equal to 1",
      vars: objetiveFunction.vars.map((item) => {
        return {
          coef: 1,
          name: item.name,
        };
      }),
      bnds: {
        type: GLPK_BOUND_TYPES.GLP_FX,
        lb: 1,
        ub: 1,
      },
    });

    const linearProblem: LP = {
      name: problemName,
      objective: objetiveFunction,
      subjectTo: restriction,
      options,
    };

    return linearProblem;
  }
}
