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

  console.log("Obtendo Propriedades Intelectuais do proprietário...");

  //convertendo
  const assetCount = await contract.nextAssetId();
  const assetCountNumber = parseInt(assetCount.toString(), 10);

  console.log("Total de ativos registrados:", assetCountNumber);

  //percorrendo e printando
  for (let i = 1; i < assetCountNumber; i++) {
    const asset = await contract.intellectualProperties(i);
    //asset.owner.toLowerCase() === deployer.address.toLowerCase()
    if (true) {
      console.log(
        `ID: ${asset.id}, Nome: ${asset.name}, Proprietário: ${asset.owner}`
      );
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Erro ao obter PIs:", error);
    process.exit(1);
  });
