var GarewaToken=artifacts.require("./GarewaToken.sol");

contract('GarewaToken',(accounts)=>{

  before(async()=>{
    this.myContract=await GarewaToken.deployed();
  })

  it('deploys successfully',async()=>{
    const address=await this.myContract.address;
    assert.notEqual(address, 0x0);
    assert.notEqual(address, '');
    assert.notEqual(address, null);
    assert.notEqual(address, undefined);
  })

  it('Initialize the contract with the correct values i.e Name,Symbol,Standard',async()=>{
    const name=await this.myContract.name();
    assert.equal(name,'GarewaToken','Checks that our token name is correct');
    console.log(`Name:${name}`);
    const symbol=await this.myContract.symbol();
    assert.equal(symbol,'GAWT','Checks that our token symbol is right');
    console.log(`Symbol:${symbol}`);
    const standard=await this.myContract.standard();
    assert.equal(standard,'GAW Token v1.0','Checks that our token standard is right');
    console.log(`Standard: ${standard}`);
  })


  it('total token supply check upon deployment',async()=>{
    const tokenSupply=await this.myContract.totalSupply();
    assert.equal(tokenSupply.toNumber(),1000000,'sets the total token supply to 10,00,000');
  })

  it('allocates the tokens for instance to the first account in the blockchain in ganache',async()=>{
    const adminBalance=await this.myContract.balanceOf(accounts[0]);
    assert.equal(adminBalance.toNumber(),1000000,'it allocates the initial supply i.e 1 million Garewa tokens to admin account');
    console.log(`Admin Account Balance:${adminBalance.toNumber()} GAWT`);
  })

  it('transfer 250000 token from Admin(accounts[0]) to accounts[1] i.e second account and checks that now the second account has 250000 GAWT',async()=>{
    const exchangeReceipt=await this.myContract.transfer(accounts[1],250000,{from:accounts[0]});
    console.log(`GAWT Transfer Receipt : ${JSON.stringify(exchangeReceipt)}`);
    const balanceSecondUser=await this.myContract.balanceOf(accounts[1]);
    console.log(`User 2 on Blockchain has : ${balanceSecondUser.toNumber()} GAWT now...`);
    assert.equal(balanceSecondUser.toNumber(),250000,'Adds the amount to the recieving account')
    const balanceAdmin=await this.myContract.balanceOf(accounts[0]);
    console.log(`Admin Account now has balance of :${balanceAdmin.toNumber()} GAWT`);
    assert.equal(balanceAdmin.toNumber(),750000,'Deducts 250000 from Sender account');
  })

})
