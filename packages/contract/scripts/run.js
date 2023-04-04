const main = async () => {
  const { hre } = require('hardhat');
  // コントラクトがコンパイルします
  // コントラクトを扱うために必要なファイルが `artifacts` ディレクトリの直下に生成されます。
  const nftContractFactory = await hre.ethers.getContractFactory('Web3Mint');
  // Hardhat がローカルの Ethereum ネットワークを作成します。
  const nftContract = await nftContractFactory.deploy();
  // コントラクトが Mint され、ローカルのブロックチェーンにデプロイされるまで待ちます。
  await nftContract.deployed();
  console.log('Contract deployed to:', nftContract.address);

  const txn = await nftContract.mintIpfsNFT(
    'poker',
    'bafybeibewfzz7w7lhm33k2rmdrk3vdvi5hfrp6ol5vhklzzepfoac37lry',
  );
  await txn.wait();
  const returnedTokenUri = await nftContract.tokenURI(0);
  console.log('tokenURI:', returnedTokenUri);
};
// エラー処理を行っています。
const runMain = async () => {
  try {
    await main();
  } catch (error) {
    console.log(error);
  }
};

runMain();
