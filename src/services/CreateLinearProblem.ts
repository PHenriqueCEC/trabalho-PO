import GLPK, { LP } from "glpk.js";
import { GLPK_PROBLEM_TYPE } from "../constants/glpk";
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
        unity: restriction.unity,
        vars: problemData.map((item) => {
          return {
            name: item.name,
            value: item[restriction.label],
          };
        }),
        bnds: {
          type: 1,
          ub: restriction.limSup,
          lb: restriction.limInf,
        },
      };
    });

    // return {
    //     name: string;
    //     vars: {
    //         name: string;
    //         coef: number;
    //     }[];
    //     bnds: {
    //         type: number;
    //         ub: number;
    //         lb: number;
    //     };
    // };
  }

  execute(
    problemData: Array<any>,
    restrictions: Array<Restriction>,
    problemName: string
  ) {
    const objetiveFunction = this.makeObjetiveFunction(problemData);

    const restriction = this.makeRestrictions(problemData, restrictions);

    console.log(restriction[0]);

    // const linearProblem: LP = {
    //   name : problemName,
    //   objective: objetiveFunction,
    //   subjectTo :

    // };
  }
}
