const Trading = artifacts.require("Trading");

module.exports = function(deployer) {
    deployer.deploy(Trading);
};