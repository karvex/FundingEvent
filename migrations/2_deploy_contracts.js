var FundingEvent = artifacts.require("./FundingEvent.sol");

module.exports = function(deployer) {
  deployer.deploy(FundingEvent);
};
