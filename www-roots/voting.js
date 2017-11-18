var web3 = new Web3(web3.currentProvider);

var abi = JSON.parse('[{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"x","type":"bytes32"}],"name":"bytes32ToString","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"contractOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"type":"constructor"}]')
var VotingContract = web3.eth.contract(abi);
// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
var contractInstance = VotingContract.at('0x447ac601434cfefb055ec7e1a1f145accc53841a');

var candidates = { "Chi": "candidate-1", "Victor": "candidate-2", "Hampus": "candidate-3" }

$(document).ready(function () {
  var candidateNames = Object.keys(candidates);
  for (var i = 0; i < candidateNames.length; i++) {
    let name = candidateNames[i];
    contractInstance.totalVotesFor.call(name, function (test, val) {
      $("#" + candidates[name]).html(val.c[0]);
    });
  }
});

function voteForCandidate() {
  candidateName = $("#candidate").val();

  contractInstance.voteForCandidate(candidateName, { from: web3.eth.accounts[0] }, function () {
    let div_id = candidates[candidateName];
    contractInstance.totalVotesFor.call(candidateName, function (error, result) {
      $("#" + div_id).html(result.c[0]);
    });
  });
}