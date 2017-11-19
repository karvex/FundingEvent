var FundingEvent = artifacts.require("./FundingEvent.sol");

contract('FundingEvent', function(accounts) {
  it("add data", function() {
      var i;
      var a0 = "0xca35b7d915458ef540ade6068dfe2f44e8fa733c";

    return FundingEvent.deployed().then(function(instance) {
        i = instance;
        instance.registerSpeaker("Nick", "bio", "url", {from: accounts[0]});
        instance.registerLocation("Cirkus", 14000, 700, {from: accounts[1]});
        instance.registerParticipant("Chi", "chihaopoon@gmail.com", {from: accounts[2]});
        instance.createMeetup("Hackathon", 999999999999999, a0, a0, {from: accounts[3]});
        
        instance.registerSpeaker("jill111", "Breakfast", "https://pi.tedcdn.com/r/pe.tedcdn.com/images/ted/5ab70a8813bed2fe065ca7534513866145155873_2880x1620.jpg?quality=95&w=480", {from: accounts[2]});
        //instance.registerSpeaker("pashminu", "Tasty burger", "http://image.pbs.org/video-assets/pbs/ted-talks/209634/images/mezzanine_243.jpg.resize.800x450.jpg", {from: accounts[3]});
        //instance.registerSpeaker("Danson67", "Camera", "https://pi.tedcdn.com/r/pe.tedcdn.com/images/ted/25a5bc18d2472308c8ed2bb401b4a497f49a0265_1600x1200.jpg?quality=89&w=800", {from: accounts[4]});
        //instance.registerSpeaker("fancycrave1", "Morning", "https://pi.tedcdn.com/r/pe.tedcdn.com/images/ted/110884_800x600.jpg?w=1200", {from: accounts[5]});
      //return instance.getBalance.call(accounts[0]);
    }).then(function() {
        return i.getSpeaker.call(0);
    }).then(function(speaker) {
        assert.equal(web3.toAscii(speaker[0]), "name", "Name OK");
    });
  });
//   it("should call a function that depends on a linked library", function() {
//     var meta;
//     var metaCoinBalance;
//     var metaCoinEthBalance;

//     return MetaCoin.deployed().then(function(instance) {
//       meta = instance;
//       return meta.getBalance.call(accounts[0]);
//     }).then(function(outCoinBalance) {
//       metaCoinBalance = outCoinBalance.toNumber();
//       return meta.getBalanceInEth.call(accounts[0]);
//     }).then(function(outCoinBalanceEth) {
//       metaCoinEthBalance = outCoinBalanceEth.toNumber();
//     }).then(function() {
//       assert.equal(metaCoinEthBalance, 2 * metaCoinBalance, "Library function returned unexpected function, linkage may be broken");
//     });
//   });
//   it("should send coin correctly", function() {
//     var meta;

//     // Get initial balances of first and second account.
//     var account_one = accounts[0];
//     var account_two = accounts[1];

//     var account_one_starting_balance;
//     var account_two_starting_balance;
//     var account_one_ending_balance;
//     var account_two_ending_balance;

//     var amount = 10;

//     return MetaCoin.deployed().then(function(instance) {
//       meta = instance;
//       return meta.getBalance.call(account_one);
//     }).then(function(balance) {
//       account_one_starting_balance = balance.toNumber();
//       return meta.getBalance.call(account_two);
//     }).then(function(balance) {
//       account_two_starting_balance = balance.toNumber();
//       return meta.sendCoin(account_two, amount, {from: account_one});
//     }).then(function() {
//       return meta.getBalance.call(account_one);
//     }).then(function(balance) {
//       account_one_ending_balance = balance.toNumber();
//       return meta.getBalance.call(account_two);
//     }).then(function(balance) {
//       account_two_ending_balance = balance.toNumber();

//       assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
//       assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
//     });
//   });
});
