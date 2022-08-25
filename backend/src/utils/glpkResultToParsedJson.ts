//@ts-nocheck
export default function glpkResultToParsedJson(json: any, materialData) {
  const jsonParsed = Object.keys(json).map((key) => {
    const quantity = json[key].toFixed(3);

    const price = materialData.find((material) => material.name === key).Preco;
    const formattedPrice = `R$  ${(quantity * price).toFixed(3)}`;

    return {
      "Nome material": key,
      "Quantidade(KG)": json[key].toFixed(4),
      "Preço ": formattedPrice,
    };
  });

  return jsonParsed;
}
