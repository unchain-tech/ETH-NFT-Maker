const { assert } = require('chai');
const { ethers } = require('hardhat');

describe('Web3Mint', () => {
  it('Should return the nft', async () => {
    const Mint = await ethers.getContractFactory('Web3Mint');
    const mintContract = await Mint.deploy();
    await mintContract.deployed();

    const [owner, addr1] = await ethers.getSigners();

    const nftName = 'poker';
    const ipfsCID =
      'bafkreievxssucnete4vpthh3klylkv2ctll2sk2ib24jvgozyg62zdtm2y';

    // 違うアドレスでNFTをmint
    await mintContract.connect(owner).mintIpfsNFT(nftName, ipfsCID);
    await mintContract.connect(addr1).mintIpfsNFT(nftName, ipfsCID);

    // mintしたアドレスによって違うNFTが作成されていることをテスト
    assert.equal(
      await mintContract.tokenURI(0),
      'data:application/json;base64,eyJuYW1lIjogInBva2VyIC0tIE5GVCAjOiAwIiwgImRlc2NyaXB0aW9uIjogIkFuIGVwaWMgTkZUIiwgImltYWdlIjogImlwZnM6Ly9iYWZrcmVpZXZ4c3N1Y25ldGU0dnB0aGgza2x5bGt2MmN0bGwyc2syaWIyNGp2Z296eWc2MnpkdG0yeSJ9',
    );
    assert.equal(
      await mintContract.tokenURI(1),
      'data:application/json;base64,eyJuYW1lIjogInBva2VyIC0tIE5GVCAjOiAxIiwgImRlc2NyaXB0aW9uIjogIkFuIGVwaWMgTkZUIiwgImltYWdlIjogImlwZnM6Ly9iYWZrcmVpZXZ4c3N1Y25ldGU0dnB0aGgza2x5bGt2MmN0bGwyc2syaWIyNGp2Z296eWc2MnpkdG0yeSJ9',
    );
  });
});
