pragma solidity ^0.5.0;

contract GarewaToken{
   // Name
   string public name= "GarewaToken";

   // Symbol
   string public symbol= "GAWT";

   // Standard
   string public standard="GAW Token v1.0";

   uint256 public totalSupply;

   // mapping(key(address):value(balance)) of tokens to the owner address
   // defined it public will give us a reader function to get the balance of individual owners of the GarewaToken
   // these mapping helps to know who has the tokens i.e thier address

   mapping(address=> uint256) public balanceOf;

   // ================== CONSTRUCTOR ============================
   // Constructor to set the value for number of tokens available

   constructor (uint256 _initialSupply) public{
       // allocate the initial supply
       // so in balance their is a key msg.sender value as _initialSupply
       // here msg is a global variable and sender is the address who calls this function
       // and msg.sender will give the address of the first address in ganache blockchain.

       // refer https://docs.soliditylang.org/en/v0.4.24/units-and-global-variables.html
       balanceOf[msg.sender] = _initialSupply;

       // a state variable available everywhere in SC
       // a convention _ that tells varialble only accessible inside the function
       totalSupply = _initialSupply;

       }

    // ===================== TRANSFER FUNCTION =========================
    // Transfer function to transfer tokens from one account to another on blockchain
    // function transfer(address _to,uint256 value) returns (bool success)
    // transfer event trigger and throw exception if account do not have enough to exchange.

    // address is special data type that represents the address of the user on the blockchain
    function transfer(address _to, uint256 _value) public returns (bool success){

        // to check the user has sufficient tokens
        // require here means that if the inside the () value is true then continue function execution
        require(balanceOf[msg.sender] >= _value);

        // transfer the amount from sender to receiver
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

    }



}
