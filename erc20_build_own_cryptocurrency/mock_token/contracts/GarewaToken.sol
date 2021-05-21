pragma solidity ^0.5.0;

contract GarewaToken{
   // Constructor to set the value for number of tokens available
   // Set the tokens
   // Read the total number of tokens

   uint256 public totalSupply;

   constructor () public{
       // a state variable available everywhere in SC
       totalSupply=1000000;
   }
}
