const hre = require("hardhat");
const { ethers } = hre;

async function main() {
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  if (!contractAddress || contractAddress.length !== 42) {
    console.error("Endereço do contrato inválido.");
    return;
  }

  try {
    const IntellectualPropertyToken = await ethers.getContractFactory(
      "IntellectualPropertyToken"
    );
    const contract = IntellectualPropertyToken.attach(contractAddress);
    console.log("Contrato conectado com sucesso no endereço:", contractAddress);

    const totalSupply = await contract.totalSupply();
    console.log(
      "Total de tokens fornecidos pelo contrato:",
      totalSupply.toString()
    );
  } catch (error) {
    console.error("Erro ao tentar conectar ao contrato:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
