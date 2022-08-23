// @ts-nocheck
import fs from "fs";
import path from "path";
import xlsx from "xlsx";
import { Restriction } from "../interfaces/LinearProblem";

interface ServiceReturn {
  restrictions: Array<Restriction>;
  materialsData: Array<Any>;
}

export default class ProcessCsv {
  results: Array<any>;

  constructor() {
    this.results = [];
  }

  getVariablesInfoFromData(data): Array<any> {
    const materialsData: Array<any> = [];

    const materialsData = [...data[0]].splice(5).map((material, index) => {
      return {
        name: material,
      };
    });

    [...data].splice(1).forEach((data, index) => {
      const dataCopy = [...data];

      const label = data[0];

      materialsData[label] = {};

      dataCopy.splice(5).forEach((value, index) => {
        materialsData[index][label] = value;
      });
    });

    return materialsData;
  }

  getRestrictionsFromData(data): Array<Restriction> {
    const restrictions: Array<Restriction> = [...data]
      .splice(3)
      .map((restriction) => {
        return {
          label: restriction[0],
          unity: restriction[1],
          exigences: restriction[2],
          limInf: restriction[3],
          limSup: restriction[4],
        };
      });

    return restrictions;
  }

  execute(odsFile: Buffer): ServiceReturn {
    const wb = xlsx.read(odsFile);

    const data: Array<Array<any>> = xlsx.utils.sheet_to_json(
      wb.Sheets[wb.SheetNames[0]],
      {
        header: 1,
      }
    );

    const restrictions = this.getRestrictionsFromData(data);
    const materialsData = this.getVariablesInfoFromData(data);

    // fs.writeFileSync("variaveis.json", JSON.stringify(materialsData, null, 2));
    // fs.writeFileSync("restricoes.json", JSON.stringify(restrictions, null, 2));

    return { materialsData, restrictions };
  }
}
