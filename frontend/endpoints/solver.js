import api from "../services/api";

export const solveProblem = async ({ file, problemName }) => {
  const data = new FormData();

  data.append("data", file);
  data.append("problemName", problemName);

  return await api.post("optimize/solve", data);
};
