const main = async () => {
  const hre = require('hardhat');

  const nftName = 'poker';
  const ipfsCID = 'bafkreievxssucnete4vpthh3klylkv2ctll2sk2ib24jvgozyg62zdtm2y';

  // コントラクトがコンパイルします
  // コントラクトを扱うために必要なファイルが `artifacts` ディレクトリの直下に生成されます。
  const nftContractFactory = await hre.ethers.getContractFactory('Web3Mint');
  // Hardhat がローカルの Ethereum ネットワークを作成します。
  const nftContract = await nftContractFactory.deploy();
  // コントラクトが Mint され、ローカルのブロックチェーンにデプロイされるまで待ちます。
  await nftContract.deployed();
  console.log('Contract deployed to:', nftContract.address);
  // mintIpfsNFT 関数を呼び出す。NFT が Mint される。
  let txn = await nftContract.mintIpfsNFT(nftName, ipfsCID);
  // Minting が仮想マイナーにより、承認されるのを待ちます。
  await txn.wait();
  console.log('Minted NFT #1');
  // mintIpfsNFT 関数をもう一度呼び出します。NFT がまた Mint されます。
  txn = await nftContract.mintIpfsNFT(nftName, ipfsCID);
  // Minting が仮想マイナーにより、承認されるのを待ちます。
  await txn.wait();
  console.log('Minted NFT #2');
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
