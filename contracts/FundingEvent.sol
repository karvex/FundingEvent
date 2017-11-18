pragma solidity ^0.4.18;

contract FundingEvent {
    
    
    function FundingEvent() public {
            
    }
    
    mapping(address => Speaker) public speakers;
    
    struct Speaker {
        string name;
        string bio;
        string url;
    }
    
    function RegisterSpeaker (string name, string bio, string url){
        //require(speakers[msg.sender] == );
        speakers[msg.sender] = Speaker(name, bio, url);
    }
    
}