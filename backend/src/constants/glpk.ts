export enum GLPK_PROBLEM_TYPE {
  GLP_MIN = 1,
  GLPK_MAX = 2,
}

export enum GLPK_BOUND_TYPES {
  GLP_UP = 3,
  GLP_LO = 2,
  GLP_FX = 5,
}

export enum GLPK_RESULT_TYPE {
  GLP_UNDEF = 1,
  GLP_INFEAS = 3,
  GLP_NOFEAS = 4,
}
