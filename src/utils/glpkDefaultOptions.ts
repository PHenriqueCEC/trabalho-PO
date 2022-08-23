//@ts-nocheck
import glpk, { Result } from "glpk.js";

export const options = {
  msglev: glpk().GLP_MSG_ALL,
  presol: true,
  cb: {
    call: (result: Result) => {},
    each: 1,
  },
};
