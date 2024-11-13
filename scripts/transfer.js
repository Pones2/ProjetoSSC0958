const hre = require("hardhat");
const { ethers } = hre;

async function main() {
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const [owner, recipient] = await ethers.getSigners();
  if (!owner || !recipient) {
    throw new Error(
      "Não há signers suficientes para realizar a transferência."
    );
  }

  console.log("Endereço do contrato:", contractAddress);

  try {
    const IntellectualPropertyToken = await ethers.getContractFactory(
      "IntellectualPropertyToken"
    );
    const contract = await IntellectualPropertyToken.attach(
      contractAddress
    ).connect(owner);

    console.log("Contrato conectado com sucesso no endereço:", contractAddress);
    const idTransfer = 4;
    console.log(
      "Transferindo o ativo de propriedade intelectual de ID " +
        idTransfer.toString() +
        " para o destinatário..."
    );
    const txTransferAsset = await contract.transferAsset(
      idTransfer,
      recipient.address
    );
    await txTransferAsset.wait();
    console.log("Ativo de propriedade intelectual transferido com sucesso.");

    console.log(
      "Saldo inicial do destinatario:",
      (await contract.balanceOf(recipient.address)).toString()
    );
    console.log("Transferindo 100 tokens para a conta do proprietario...");

    const txTokens = await contract.transfer(owner.address, 100);
    await txTokens.wait();

    console.log(
      "Saldo do proprietário após transferência:",
      (await contract.balanceOf(owner.address)).toString()
    );
    console.log(
      "Saldo do destinatário após transferência:",
      (await contract.balanceOf(recipient.address)).toString()
    );
  } catch (error) {
    console.error(
      "Erro ao tentar conectar ou interagir com o contrato:",
      error
    );
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
