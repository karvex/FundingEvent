var web3 = new Web3(web3.currentProvider);

var abi = JSON.parse('[{"constant":false,"inputs":[{"name":"name","type":"string"},{"name":"bio","type":"string"},{"name":"url","type":"string"}],"name":"RegisterSpeaker","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"speakers","outputs":[{"name":"name","type":"string"},{"name":"bio","type":"string"},{"name":"url","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]')
var contract = web3.eth.contract(abi);
// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
var contractInstance = contract.at('0xf46bc3bff9c18fa0b8c22ffa7ef594c093d02b4f');

contractInstance.RegisterSpeaker()

//var candidates = { "Chi": "candidate-1", "Victor": "candidate-2", "Hampus": "candidate-3" }


//   var candidateNames = Object.keys(candidates);
//   for (var i = 0; i < candidateNames.length; i++) {
//     let name = candidateNames[i];
//     contractInstance.totalVotesFor.call(name, function (test, val) {
//       $("#" + candidates[name]).html(val.c[0]);
//     });
//   }
// function voteForCandidate() {
//   candidateName = $("#candidate").val();

//   contractInstance.voteForCandidate(candidateName, { from: web3.eth.accounts[0] }, function () {
//     let div_id = candidates[candidateName];
//     contractInstance.totalVotesFor.call(candidateName, function (error, result) {
//       $("#" + div_id).html(result.c[0]);
//     });
//   });
// }