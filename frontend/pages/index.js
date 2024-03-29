import React, { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.scss";
import UploadButton from "../components/UploadButton";
import DownloadButton from "../components/DownloadButton";
import { AiOutlineDownload } from "react-icons/ai";
import { solveProblem } from "../endpoints/solver";
import { Navbar } from "../components/Navbar";
import { ErrorAlert } from "../components/ErrorAlert";
import { moneyFormatter } from "../components/utils";

export default function Home() {
  const [solveProblemSuccess, setSolveProblemSuccess] = useState(false);
  const [solvedProblemData, setSolvedProblemData] = useState({});
  const [isResultsSectionVisible, setIsResultSectionVisible] = useState(false);

  const { result = {} } = solvedProblemData;
  const { sheet } = solvedProblemData;
  const { materialsData = [] } = solvedProblemData;

  const fetchSolverEndpoint = async (file) => {
    try {
      const response = await solveProblem({
        file,
        problemName: "Otimização de ração",
      });
      setSolveProblemSuccess(true);

      setSolvedProblemData(response.data);
    } catch (err) {
      setSolveProblemSuccess(false);
      console.log(err);
      setSolvedProblemData({
        error: err.response.data.message,
      });
    } finally {
      setIsResultSectionVisible(true);
    }
  };

  const onFileChange = (event) => {
    const file = event.target.files[0];

    fetchSolverEndpoint(file);
  };

  const renderResultsTable = () => (
    <div className={styles.table__container}>
      <div>
        <span>
          Preço por kg da ração :
          <strong> {moneyFormatter.format(result.z)} </strong>
        </span>
        <button onClick={downloadFile} className={styles.exportButton}>
          Exportar resultados
        </button>
      </div>

      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th> Material </th>
            <th> Custo </th>
            <th> Quantidade (Gramas) </th>
          </tr>
        </thead>
        <tbody>
          {resultsSorted &&
            resultsSorted.map((key) => {
              const quantity = result?.vars[key];
              const quantityInGramas = quantity.toFixed(3) * 1000;
              const materialData = materialsData.find(
                (item) => item.name === key
              );

              const price = quantity
                ? (parseFloat(materialData.Preco) * quantity).toFixed(3)
                : 0;

              return (
                <tr key={key}>
                  <td>{key}</td>
                  <td> {price ? moneyFormatter.format(price) : "-"} </td>
                  <td>{quantityInGramas}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );

  const resultsSorted =
    solveProblemSuccess && result
      ? Object.keys(result.vars).sort((previous, current) =>
          result?.vars[previous] > result?.vars[current] ? -1 : 1
        )
      : [];

  const downloadFile = () => {
    console.log(sheet);

    const data = new Blob([new Uint8Array(sheet.data).buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;",
    });
    const sheetUrl = window.URL.createObjectURL(data);

    const tempLink = document.createElement("a");
    tempLink.href = sheetUrl;
    tempLink.setAttribute("download", `resultado.xlsx`);
    tempLink.click();
  };

  const renderErrorMessage = () => {
    <span> {solvedProblemData.error} </span>;
  };

  const renderResultsSection = () => {
    return (
      <div className="custom-container">
        <Navbar onGoBackButton={() => setIsResultSectionVisible(false)} />
        {solveProblemSuccess ? (
          <>
            <h1> Resultado do processamento</h1>
            {renderResultsTable()}
          </>
        ) : (
          <ErrorAlert>{solvedProblemData.error}</ErrorAlert>
        )}
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Linear Solver</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        {!isResultsSectionVisible ? (
          <div className={styles.contentContainer}>
            <h1> Adicione a planilha com os dados </h1>
            <div>
              <div>
                <UploadButton onChange={onFileChange} />
              </div>
            </div>
            <DownloadButton href="dadosNutrientesRação26-08-2022" download>
              Baixar modelo da planilha
            </DownloadButton>
          </div>
        ) : (
          <div>{renderResultsSection()}</div>
        )}
      </div>
    </>
  );
}
