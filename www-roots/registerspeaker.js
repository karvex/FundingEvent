var web3 = new Web3(web3.currentProvider);
$(document).ready(function () {


});

function registerSpeaker() {
  var abi = JSON.parse('[{"constant":false,"inputs":[{"name":"name","type":"string"},{"name":"bio","type":"string"},{"name":"url","type":"string"}],"name":"RegisterSpeaker","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"speakers","outputs":[{"name":"name","type":"string"},{"name":"bio","type":"string"},{"name":"url","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]')
  var contract = web3.eth.contract(abi);
  // In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
  var contractInstance = contract.at('0xf46bc3bff9c18fa0b8c22ffa7ef594c093d02b4f');

  var name = $("#name").val();
  var bio = $("#bio").val();
  var imageUrl = $("#imageUrl").val();
  contractInstance.RegisterSpeaker(name, bio, imageUrl, { from: web3.eth.accounts[0] }, function () {
    alert("success!");
  });
}

