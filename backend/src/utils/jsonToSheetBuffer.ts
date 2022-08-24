import xlsx from "xlsx";

export default function jsonToSheetBuffer(json: Object) {
  const workSheet = xlsx.utils.json_to_sheet([json]);

  const workBook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workBook, workSheet, "Sheet 1");
  const sheet = xlsx.write(workBook, { type: "buffer" });

  return sheet;
}
