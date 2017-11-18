pragma solidity ^0.4.18;

contract FundingEvent {
    
    function FundingEvent() public {
            
    }
    
    mapping(address => Speaker) public speakers;
    Speaker[] private _speakers;
    mapping(address => Participant) public participants;
    Location[] private _locations;
    mapping(address => Location) public locations;
    Meetup[] private _meetups;
    
    struct Speaker {
        string name;
        string bio;
        string url;
    }
    
    struct Participant {
        string name;
        string email;
    }
    
    struct Location {
        string streetAddress;
        uint cost;
        uint capacity;
    }
    
    struct Meetup {
        address creator;
        string title;
        uint dateTicks;
        address speaker;
        address location;
    }
    
    function RegisterSpeaker (string name, string bio, string url) public {
        require(bytes(speakers[msg.sender].name).length == 0);
        Speaker memory s = Speaker(name, bio, url);
        speakers[msg.sender] = s;
        _speakers.push(s);
    }
    
    function GetSpeakers() public view returns (Speaker[]) {
        return _speakers;  
    }

    function RegisterParticipant(string name, string email) public {
        participants[msg.sender] = Participant(name, email);
    }
    
    function RegisterLocation(string streetAddress, uint cost, uint capacity) public {
        locations[msg.sender] = Location(streetAddress, cost, capacity);
    }
    
    function GetLocation() public view returns (Location[]) {
        return _locations;
    }
    
    function CreateMeetup(string title, uint blockTime, address speaker, address location) public speakerExists(speaker) locationExists(location) {
        require(bytes(title).length > 0);
        require(blockTime > now);
        _meetups.push(Meetup(msg.sender, title, blockTime, speaker, location));
    }
    
    function GetMeetups() public view returns (Meetup[]) {
        return _meetups;
    }
    
    function Donate() public {
        
    }
    
    modifier speakerExists(address speaker) {
        require(bytes(speakers[speaker].name).length != 0);
        _;
    }
    
    modifier locationExists(address location) {
        require(locations[location].capacity > 0);
        _;
    }
}