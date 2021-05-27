pragma solidity ^0.5.0;

contract GarewaToken{
   // Name
   string public name= "GarewaToken";

   // Symbol
   string public symbol= "GAWT";

   // Standard
   string public standard="GAW Token v1.0";

   uint256 public totalSupply;

   // ========== Transfer Event =========
   event Transfer(
      address indexed _from,
      address indexed _to,
      uint256 _value
   );

   // ========== Approval Event ==========
   event Approval(
      address indexed _owner,
      address indexed _spender,
      uint256 _value
   );

   // mapping are basically hash tables key value pairs
   // mapping(key(address):value(balance)) of tokens to the owner address
   // defined it public will give us a reader function to get the balance of individual owners of the GarewaToken
   // these mapping helps to know who has the tokens i.e thier address

   mapping(address=> uint256) public balanceOf;

   // Nested mapping this mapping says I account A =>(approve) account B=>(to spend) amount C value tokens on behalf of account A

   mapping(address=> mapping(address=> uint256)) public allowance;

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

        // call the transfer event
        emit Transfer(msg.sender, _to, _value);

        return true;

    }

    // ============= DELEGATED TRANSFER FUNCTION ==================
    // TO MAKE SURE THAT THE TRANSFER IS INITIATED PROGRAMATICALLY RATHER THAN VIA THE SENDER ADDRESS
    // transferfrom,approve,allowance and the Approval event that gets trigered when approve is called

    // approve
    function approve(address _spender,uint256 _value) public returns (bool success){

      // handle allowance
      allowance[msg.sender][_spender] = _value;

      // trigger Approval event
      emit Approval(msg.sender, _spender , _value);


      return true;
    }

    // transferfrom third party(PROGRAMATICALLY) initiator
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success){

        require(_value<= balanceOf[_from]);
        // Require _from has enough tokens

        require(_value <= allowance[_from][msg.sender]);
        // Require allowance is big enough approved

        // Change the Balance
        // update the allowance
        // trigger the Transfer event
        emit Transfer(_from,_to,_value);

        // return a boolean
        return true;

    }


}
