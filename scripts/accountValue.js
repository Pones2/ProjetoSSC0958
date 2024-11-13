async function main() {
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const IntellectualPropertyToken = await ethers.getContractFactory(
    "IntellectualPropertyToken"
  );
  const contract = IntellectualPropertyToken.attach(contractAddress);

  const signers = await ethers.getSigners();
  const account = signers[1];

  const balance = await contract.balanceOf(account.address);
  console.log(`Saldo da conta ${account.address}:`, balance.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
