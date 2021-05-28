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

  it('test for the transfer event trigger by the Receipt',async()=>{
    const exchangeReceipt=await this.myContract.transfer(accounts[1],25,{from:accounts[0]});
    console.log(`GAWT Transfer Receipt : ${JSON.stringify(exchangeReceipt)}`);
    assert.equal(exchangeReceipt.logs.length,1,'triggers one event');
    assert.equal(exchangeReceipt.logs[0].event,'Transfer','should be the "Transfer" event');
    console.log(`Number of Event Triggered: ${exchangeReceipt.logs.length}`);
    console.log(`Event Name : ${exchangeReceipt.logs[0].event}`);
    assert.equal(exchangeReceipt.logs[0].args._from,accounts[0],'logs the from account');
    assert.equal(exchangeReceipt.logs[0].args._to,accounts[1],'logs the to account');
    console.log(`GAWT Tranferred From: ${exchangeReceipt.logs[0].args._from}`);
    console.log(`GAWT Tranferred To: ${exchangeReceipt.logs[0].args._to}`) ;
    assert.equal(exchangeReceipt.logs[0].args._value,25,'logs the transfer amount');
    console.log(`GAWT transferred: ${exchangeReceipt.logs[0].args._value}`);
    const balanceSecondUser=await this.myContract.balanceOf(accounts[1]);
    console.log(`User 2 on Blockchain has : ${balanceSecondUser.toNumber()} GAWT now...`);
    const balanceAdmin=await this.myContract.balanceOf(accounts[0]);
    console.log(`Admin Account now has balance of :${balanceAdmin.toNumber()} GAWT`);
  })

  // note .call() only calls the function it do not changes the data on the blockchain or the amount of GAWT each accounts hold
  // good appraoch for testing only the return value
  it('Check transfer function returns a bool value',async()=>{
    const success=await this.myContract.transfer.call(accounts[1],50,{from:accounts[0]});
    assert.equal(success,true,'it returns true');
  })

  it('test the "Approves token for deligated transfer" Mechanism',async()=>{
    const success=await this.myContract.approve.call(accounts[1],100);
    assert.equal(success,true,'it returns true');

    // approve test cases

    const exchangeReceipt=await this.myContract.approve(accounts[1],100,{ from:accounts[0] });
    //console.log(`GAWT Transfer Receipt : ${JSON.stringify(exchangeReceipt)}`);
    assert.equal(exchangeReceipt.logs.length,1,'triggers 1 Approval event');
    assert.equal(exchangeReceipt.logs[0].event,'Approval','should be the "Approval" event');
    console.log(`Number of Event Triggered: ${exchangeReceipt.logs.length}`);
    console.log(`Event Name : ${exchangeReceipt.logs[0].event}`);
    assert.equal(exchangeReceipt.logs[0].args._owner,accounts[0],'logs the from account who authorize the token');
    assert.equal(exchangeReceipt.logs[0].args._spender,accounts[1],'logs the to account to whom the tokens are authorized');
    console.log(`GAWT Tranferred From: ${exchangeReceipt.logs[0].args._owner}`);
    console.log(`GAWT Tranferred To: ${exchangeReceipt.logs[0].args._spender}`) ;
    assert.equal(exchangeReceipt.logs[0].args._value,100,'logs the approve delegated transfer amount');
    console.log(`GAWT Approved delegated transfer Amount : ${exchangeReceipt.logs[0].args._value}`);

    // allowance test cases

    const allowance=await this.myContract.allowance(accounts[0],accounts[1]);
    assert.equal(allowance.toNumber(),100,'stores the allowance for delegated transfer');
    console.log(`accounts[0] gave allowance of : ${allowance.toNumber()} to account[1]`);
  })

  // handles delegated transfers transferfrom
  it('test the transferfrom delegated transfer',async()=>{
    const fromAccount=accounts[2];
    const toAccount=accounts[3];
    const spendingAccount=accounts[4];
    // Transfer tokens fromAccount
    const transferReceipt=await this.myContract.transfer(fromAccount,100,{from:accounts[0]});
    //console.log(`transfer token to accounts[2] from accounts[0]:${JSON.stringify(transferReceipt)}`);
    // Approve spendingAccount to spend 10 tokens from fromAccount
    const approveReceipt=await this.myContract.approve(spendingAccount,10,{from:fromAccount});
    //console.log(`Approve receipt to approve spendingAccount to spent 10 tokens:${JSON.stringify(approveReceipt)}`);
    // const success=await this.myContract.transferFrom.call(fromAccount,toAccount,10,{from:spendingAccount});
    // assert.equal('success',true);

    const transferfromReceipt=await this.myContract.transferFrom(fromAccount,toAccount,10,{from:spendingAccount});
    assert.equal(transferfromReceipt.logs.length,1,'triggers 1 transferFrom event');
    assert.equal(transferfromReceipt.logs[0].event,'Transfer','should be the "Transfer" event');
    console.log(`Number of Event Triggered: ${transferfromReceipt.logs.length}`);
    console.log(`Event Name : ${transferfromReceipt.logs[0].event}`);
    assert.equal(transferfromReceipt.logs[0].args._from,fromAccount,'logs the from account who authorize the token');
    assert.equal(transferfromReceipt.logs[0].args._to,toAccount,'logs the to account to whom the tokens are authorized');
    console.log(`GAWT Tranferred From: ${transferfromReceipt.logs[0].args._from}`);
    console.log(`GAWT Tranferred To: ${transferfromReceipt.logs[0].args._to}`) ;
    assert.equal(transferfromReceipt.logs[0].args._value,10,'logs the approve delegated transfer amount');
    console.log(`GAWT Approved delegated transfer Amount : ${transferfromReceipt.logs[0].args._value}`);

    const success=await this.myContract.transferFrom.call(fromAccount,toAccount,10,{from:spendingAccount});

    // check balance of fromAccount and toAccount
    const balanceSender = await this.myContract.balanceOf(fromAccount);
    assert.equal(balanceSender.toNumber(),90,'checks that the fromAccount has now balance of 90');
    console.log(`Now the Sender's Account who had earlier 100 tokens now have :${balanceSender.toNumber()} GAWT`);

    const balance = await this.myContract.balanceOf(toAccount);
    assert.equal(balance.toNumber(),10,'checks that the toAccount has now balance of 10');
    console.log(`Now the Reciever's Account who had earlier 0 tokens now has :${balance.toNumber()} GAWT`);

    // check that allowance is now 0 after 10 token transfer
    const allowance = this.myContract.allowance(fromAccount,spendingAccount);
    console.log(`Now the allowance is set to 0 : ${allowance.toNumber()}`);
    assert.equal(allowance.toNumber(),0,'check that the allowance is set to 0 when the 10 token transfer was done.');
    })

})
