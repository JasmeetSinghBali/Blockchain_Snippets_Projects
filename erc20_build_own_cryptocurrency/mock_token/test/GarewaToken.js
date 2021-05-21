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

  it('total token supply check upon deployment',async()=>{
    const tokenSupply=await this.myContract.totalSupply();
    assert.equal(tokenSupply.toNumber(),1000000,'sets the total token supply to 1000000');
  })
})
