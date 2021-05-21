const GarewaToken = artifacts.require("./GarewaToken.sol");

module.exports = function(deployer) {
  deployer.deploy(GarewaToken);
};
