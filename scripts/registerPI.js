const hre = require("hardhat");
const { ethers } = hre;

async function main() {
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const [deployer] = await ethers.getSigners();

  console.log("Conectando ao contrato em:", contractAddress);

  const IntellectualPropertyToken = await ethers.getContractFactory(
    "IntellectualPropertyToken"
  );
  const contract = await IntellectualPropertyToken.attach(
    contractAddress
  ).connect(deployer);

  //adicioando uma nova PI
  const piName = "Propriedade Teste";
  console.log("Registrando nova Propriedade Intelectual...");
  const tx = await contract.registerAsset(piName);
  await tx.wait();

  console.log(`Ativo de PI '${piName}' registrado com sucesso.`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Erro ao registrar PI:", error);
    process.exit(1);
  });
