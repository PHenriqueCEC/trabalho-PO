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

    const materialsName = data[0].splice(5).forEach((material, index) => {
      materialsData[index] = {
        name: material,
        price: null,
        mininum: 0,
        maximum: 0,
      };
    });

    const alimentTypes = data[1].splice(5);

    const materialPrices = data[2].splice(5).forEach((price, index) => {
      materialsData[index].price = price;
    });

    console.log(materialsData);
  }
}
