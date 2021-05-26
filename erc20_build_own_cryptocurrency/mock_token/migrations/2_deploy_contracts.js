const GarewaToken = artifacts.require("./GarewaToken.sol");

module.exports = function(deployer) {
  // to set the _initialSupply to 1 million tokens in the constructor GarewaToken.sol
  deployer.deploy(GarewaToken,1000000);
};
