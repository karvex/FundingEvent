pragma solidity ^0.4.18;

contract FundingEvent {
    
    struct Speaker {
        address owner;
        bytes32 name;
        string bio;
        string url;
    }
    
    struct Participant {
        string name;
        string email;
    }
    
    struct Location {
        address owner;
        string streetAddress;
        uint cost;
        uint capacity;
    }
    
    enum MeetupStatus {
        ongoing, finished, cancelled
    }
    
    struct Meetup {
        address creator;
        bytes32 title;
        uint blockTime;
        address speaker;
        address location;
        uint minAmount;
        uint balance;
        MeetupStatus status;
    }
    
    Speaker[] private speakers;
    mapping(address => Participant) private participants;
    Location[] private locations;
    Meetup[] private meetups;
    mapping(address => mapping(address => uint)) donators;
    
    function registerSpeaker(bytes32 name, string bio, string url) public {
        require(!speakerExists(msg.sender));
        speakers.push(Speaker(msg.sender, name, bio, url));
    }
    
    function getSpeakers() public view returns (Speaker[]) {
        return speakers;  
    }
    
    function getSpeaker(uint index) public view returns (bytes32, string, string) {
        require(speakers.length > index);
        Speaker storage speaker = speakers[index];
        require(speaker.name != 0);
        return (speaker.name, speaker.bio, speaker.url);
    }

    function registerParticipant(string name, string email) public {
        participants[msg.sender] = Participant(name, email);
    }
    
    function registerLocation(string streetAddress, uint cost, uint capacity) public {
        locations.push(Location(msg.sender, streetAddress, cost, capacity));
    }
    
    function getLocation(uint index) public view returns (string, uint, uint) {
        require(locations.length > index);
        Location storage location = locations[index];
        require(location.capacity > 0);
        return (location.streetAddress, location.cost, location.capacity);
    }
    
    function createMeetup(bytes32 title, uint blockTime, address speaker, address location) public {
        require(locationExists(location));
        require(speakerExists(speaker));
        require(title > 0);
        require(blockTime > now);
        meetups.push(Meetup(msg.sender, title, blockTime, speaker, location, 0, 0, MeetupStatus.ongoing));
    }
    
    function getMeetup(uint index) public view returns (address, bytes32, uint, address, address, uint, uint, uint) {
        require(meetups.length > index);
        Meetup storage meetup = meetups[index];
        require(meetup.blockTime != 0);
        return (meetup.creator, meetup.title, meetup.blockTime, meetup.speaker, meetup.location, meetup.minAmount, meetup.balance, uint(meetup.status));
    }
    
    function donate(address meetup) payable public meetupExists(meetup) {
        require(msg.value > 0);
        donators[meetup][msg.sender] += msg.value;
        getMeetup(meetup).balance += msg.value;
    }
    
    function setMinMeetupAmount(address meetup, uint minAmount) public meetupExists(meetup) {
        Meetup storage currentMeetup = getMeetup(meetup);
        require(speakerExists(msg.sender));
        require(currentMeetup.speaker == msg.sender);
        require(minAmount > 0);
        currentMeetup.minAmount = minAmount;
    }
    
    function participantWithdrawal(address meetup) public meetupExists(meetup) participantExists(msg.sender) {
        uint amount = donators[meetup][msg.sender];
        require(amount > 0);
        if (getMeetup(meetup).status != MeetupStatus.finished) {
            donators[meetup][msg.sender] = 0;
            msg.sender.transfer(amount);
        }
    }
    
    function speakerWithdrawal(address meetup) public meetupExists(meetup) {
        require(speakerExists(msg.sender));
        Meetup storage currentMeetup = getMeetup(meetup);
        require(currentMeetup.blockTime < now);
        currentMeetup.balance = 0;
        
        if (currentMeetup.status != MeetupStatus.finished) {
            msg.sender.transfer(currentMeetup.balance);
            currentMeetup.status = MeetupStatus.finished;
        }
    }
    
    function getMeetup(address meetup) private returns (Meetup storage) {
        for (uint i=0; i < meetups.length; i++) {
            if (meetups[i].creator == meetup) {
                return meetups[i];
            }
        }
        revert();
    }
    
    function speakerExists(address speaker) private view returns (bool) {
        for (uint i=0; i < speakers.length; i++) {
            if (speakers[i].owner == speaker) {
                return true;
            }
        }
        return false;
    }
    
    function locationExists(address location) private view returns (bool) {
        for (uint i=0; i < locations.length; i++) {
            if (locations[i].owner == location) {
                return true;
            }
        }
        return false;
    }
    
    modifier participantExists(address participant) {
        require(bytes(participants[participant].name).length != 0);
        _;
    }
    
    modifier meetupExists(address meetup) {
        bool success = false;
        for (uint i=0; i < meetups.length; i++) {
            if (meetups[i].creator == meetup) {
                success = true;
                break;
            }
        }
        if (success == false) {
            revert();
        }
        _;
    }
}