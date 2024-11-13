const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Implantando contratos com a conta:", deployer.address);

  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Saldo da conta do deployer em wei:", balance.toString());

  const IntellectualPropertyToken = await hre.ethers.getContractFactory(
    "IntellectualPropertyToken",
    deployer
  );

  //deploy do Contrato
  const intellectualPropertyToken = await IntellectualPropertyToken.deploy(
    1000
  );

  await intellectualPropertyToken.waitForDeployment();

  console.log("Contrato implantado em:", intellectualPropertyToken.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
