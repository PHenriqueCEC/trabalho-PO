// @ts-nocheck
import { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";
import { Readable } from "stream";
import xlsx from "xlsx";

// xlsx.set_fs()
// xlsx.stream.set_readable(Readable);

// const __dirname = dirname(fileURLToPath(import.meta.url));

interface MaterialInfo {
  name: string;
  price: number;
  mininum: number;
  maximum: number;
  materiaSecaPercentage: number;
  energiaBruta: number;
  proteinPercentage: number;
}

export default class ProcessCsv {
  results: Array<any>;

  constructor() {
    this.results = [];
  }

  async getStream() {
    return new Promise((resolve, reject) => {
      const data: Array<any> = [];

      fs.createReadStream(path.join("src", "files/", "dados.ods"))
        .on("data", (row: any) => data.push(row))
        .on("end", () => resolve(data))
        .on("error", () => reject());
    });
  }

  async execute() {
    // const stream = await this.getStream();
    var wb = xlsx.readFile(path.join("src", "files/", "dados.ods"));

    const data: Array<Array<any>> = xlsx.utils.sheet_to_json(
      wb.Sheets[wb.SheetNames[0]],
      {
        header: 1,
      }
    );

    //1 Passo: relacionar preço a materiais

    const materialsData: Array<MaterialInfo> = [];

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

    const restrictions = [...data].splice(1).map((restriction) => {
      return {
        label: restriction[0],
        unity: restriction[1],
        exigences: restriction[2],
        limInf: restriction[3],
        limSup: restriction[4],
      };
    });

    fs.writeFileSync("variaveis.json", JSON.stringify(materialsData, null, 2));
    fs.writeFileSync("restricoes.json", JSON.stringify(restrictions, null, 2));
  }
}
